import { useState, useRef } from "react";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Car,
  User,
  Key,
  QrCode,
  Download,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { imageUrls } from "../../config/imageUrls";
import FileUploadField from "../auth/FileUploadField";
import filterChangeImg from "../../assets/dashboardImgs/dashHistory/filterChange.svg";
import suspensionImg from "../../assets/dashboardImgs/dashHistory/suspension.svg";
import batteryCheckImg from "../../assets/dashboardImgs/dashHistory/batteryCheck.svg";
import generalMaintImg from "../../assets/dashboardImgs/dashHistory/generalMaint.svg";
import brakeInspectionImg from "../../assets/dashboardImgs/dashHistory/brakeInspeciton.svg";
import engineImg from "../../assets/dashboardImgs/dashHistory/engine.svg";
import diagnosticScanImg from "../../assets/dashboardImgs/dashHistory/diagnosticScan.svg";
import oilChangeImg from "../../assets/dashboardImgs/dashHistory/oilChange.svg";
import acImg from "../../assets/dashboardImgs/dashHistory/ac.svg";
import exhaustImg from "../../assets/dashboardImgs/dashHistory/exhaust.svg";
import fluidTopImg from "../../assets/dashboardImgs/dashHistory/fluidTop.svg";
import wheelAlignmentImg from "../../assets/dashboardImgs/dashHistory/wheel alignment.svg";

// ─── Brand logos ──────────────────────────────────────────────────────────────

const BRAND_LOGOS = {
  lexus: imageUrls.lexus,
  toyota: imageUrls.toyota,
  ford: imageUrls.ford,
  mercedes: imageUrls.mercedes,
  bmw: imageUrls.bmw,
  hyundai: imageUrls.hyundai,
  kia: imageUrls.kia,
};

const getBrandLogo = (vehicleName) => {
  const lower = vehicleName.toLowerCase();
  for (const brand of Object.keys(BRAND_LOGOS)) {
    if (lower.startsWith(brand)) return BRAND_LOGOS[brand];
  }
  return null;
};

// ─── Parse make / model / year ────────────────────────────────────────────────

function parseVehicle(vehicleStr = "") {
  const words = vehicleStr.trim().split(/\s+/);
  const year = words[words.length - 1];
  const lower = vehicleStr.toLowerCase();
  let make = "";
  let model = "";
  if (lower.startsWith("mercedes benz")) {
    make = "Mercedes-Benz";
    model = words.slice(2, -1).join(" ");
  } else {
    for (const m of ["Lexus", "Toyota", "Ford", "BMW", "Hyundai", "Kia"]) {
      if (lower.startsWith(m.toLowerCase())) {
        make = m;
        model = words.slice(1, -1).join(" ");
        break;
      }
    }
  }
  return { make, model, year };
}

// ─── Mock VIN ─────────────────────────────────────────────────────────────────

const MOCK_VINS = [
  "1HGBH41JXMN109186","2T1BURHE0JC042551","3VWFE21C04M000001",
  "JM1GL1U52H1105739","5YJSA1DG9DFP14705","1G1BE5SM7H7242564",
  "WAUJF78P67A142669","1FTEW1EF8GKE30789",
];
const getVIN = (reg) => MOCK_VINS[parseInt(reg.replace(/\D/g, "") || "0") % MOCK_VINS.length];

// ─── Service icon map ─────────────────────────────────────────────────────────

const SERVICE_ICON_MAP = {
  "Filter Change": filterChangeImg,
  "Air Filter": filterChangeImg,
  "Suspension Check": suspensionImg,
  "Suspension": suspensionImg,
  "Battery Change": batteryCheckImg,
  "Battery Check": batteryCheckImg,
  "General Maintenance": generalMaintImg,
  "Brake Inspection": brakeInspectionImg,
  "Brake Pad": brakeInspectionImg,
  "Transmission": engineImg,
  "Engine": engineImg,
  "Radiator": fluidTopImg,
  "Electrical/Lighting": diagnosticScanImg,
  "Body Work": exhaustImg,
  "Oil Change": oilChangeImg,
  "AC Services": acImg,
  "AC Compartment": acImg,
  "Wheel Alignment": wheelAlignmentImg,
  "Exhaust System": exhaustImg,
  "Diagnostic Scan": diagnosticScanImg,
  "Fluid Top-up": fluidTopImg,
};
const getServiceIcon = (name) => SERVICE_ICON_MAP[name] || generalMaintImg;

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  "In Progress":  "bg-purple-100 text-purple-600",
  "Overdue":      "bg-red-50 text-red-500",
  "Completed":    "bg-green-50 text-green-600",
  "Due Soon":     "bg-orange-50 text-orange-500",
  "Due Today":    "bg-orange-100 text-orange-500",
  "Scheduled":    "bg-teal-50 text-teal-500",
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
    }`}
  >
    {status}
  </span>
);

// ─── Service History data ─────────────────────────────────────────────────────

const SERVICE_HISTORY_DATA = [
  { service: "Filter Change",       serviceType: "Routine Services", lastDate: "31/09/2025", nextDate: "31/09/2025", nextSub: "Overdue by 2 weeks",      status: "Overdue"     },
  { service: "Suspension Check",    serviceType: "Routine Services", lastDate: "31/09/2025", nextDate: "31/09/2025", nextSub: "Service is due today",     status: "In Progress" },
  { service: "Battery Change",      serviceType: "Repair",           lastDate: "31/09/2025", nextDate: null,         nextSub: null,                       status: "Completed"   },
  { service: "Battery Check",       serviceType: "Routine Services", lastDate: "31/09/2025", nextDate: "31/09/2025", nextSub: "Next service in 5 days",   status: "Due Soon"    },
  { service: "General Maintenance", serviceType: "Routine Services", lastDate: "31/09/2025", nextDate: "31/09/2025", nextSub: "Next service in 2 months", status: "Scheduled"   },
  { service: "Transmission",        serviceType: "Repair",           lastDate: "31/09/2025", nextDate: null,         nextSub: null,                       status: "Completed"   },
  { service: "Radiator",            serviceType: "Repair",           lastDate: "31/09/2025", nextDate: null,         nextSub: null,                       status: "Completed"   },
  { service: "Electrical/Lighting", serviceType: "Repair",           lastDate: "31/09/2025", nextDate: null,         nextSub: null,                       status: "Completed"   },
  { service: "Body Work",           serviceType: "Repair",           lastDate: "31/09/2025", nextDate: null,         nextSub: null,                       status: "Completed"   },
  { service: "Brake Inspection",    serviceType: "Routine Services", lastDate: "31/09/2025", nextDate: "31/09/2025", nextSub: "Next service in 2 weeks",  status: "Scheduled"   },
  { service: "Oil Change",          serviceType: "Routine Services", lastDate: "31/09/2025", nextDate: "31/09/2025", nextSub: "Next service in 1 month",  status: "Scheduled"   },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "basic",   label: "Basic Info",      icon: Car    },
  { key: "owner",   label: "Owner Details",   icon: User   },
  { key: "history", label: "Service History", icon: Key    },
  { key: "qr",      label: "QR Code",         icon: QrCode },
];

// ─── Basic Info tab ───────────────────────────────────────────────────────────

function BasicInfoTab({ vehicle }) {
  const { make, model, year } = parseVehicle(vehicle.vehicle);
  const vin = getVIN(vehicle.registrationNumber);
  return (
    <div className="flex flex-col gap-10 py-2">
      <div className="grid grid-cols-3">
        <div><p className="text-sm text-gray-400 mb-1">Make</p><p className="text-[15px] font-semibold text-gray-900">{make}</p></div>
        <div><p className="text-sm text-gray-400 mb-1">Model</p><p className="text-[15px] font-semibold text-gray-900">{model}</p></div>
        <div><p className="text-sm text-gray-400 mb-1">Year</p><p className="text-[15px] font-semibold text-gray-900">{year}</p></div>
      </div>
      <div className="grid grid-cols-3">
        <div><p className="text-sm text-gray-400 mb-1">Registration/Plate Number</p><p className="text-[15px] font-semibold text-gray-900">{vehicle.registrationNumber}</p></div>
        <div><p className="text-sm text-gray-400 mb-1">VIN</p><p className="text-[15px] font-semibold text-gray-900">{vin}</p></div>
      </div>
    </div>
  );
}

// ─── Owner Details tab ────────────────────────────────────────────────────────

function OwnerDetailsTab() {
  const [regDoc, setRegDoc] = useState(null);
  const [driversLicense, setDriversLicense] = useState(null);
  return (
    <div className="flex flex-col gap-8 py-2">
      <div className="grid grid-cols-2">
        <div><p className="text-sm text-gray-400 mb-1">Owner</p><p className="text-[15px] font-semibold text-gray-900">Cynthia Ejike</p></div>
        <div><p className="text-sm text-gray-400 mb-1">Account Type</p><p className="text-[15px] font-semibold text-gray-900">Individual Car Owner</p></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FileUploadField label="Vehicle Registration Document" fieldId="ownerRegDoc" fileName={regDoc} onFileChange={(e) => setRegDoc(e.target.files?.[0] || null)} />
        <FileUploadField label="Driver's License" fieldId="ownerDriversLicense" fileName={driversLicense} onFileChange={(e) => setDriversLicense(e.target.files?.[0] || null)} />
      </div>
    </div>
  );
}

// ─── Service History tab ──────────────────────────────────────────────────────

function ServiceHistoryTab() {
  const HEADERS = ["Service", "Service Type", "Last Service Date", "Next Service Date", "Status"];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-0">
        <thead>
          <tr className="border-b border-gray-100">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="text-left text-sm font-semibold text-[#3B82F6] px-4 py-3 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SERVICE_HISTORY_DATA.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {/* Service */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={getServiceIcon(row.service)}
                    alt={row.service}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                    {row.service}
                  </span>
                </div>
              </td>
              {/* Service Type */}
              <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                {row.serviceType}
              </td>
              {/* Last Service Date */}
              <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                {row.lastDate}
              </td>
              {/* Next Service Date */}
              <td className="px-4 py-3">
                {row.nextDate ? (
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{row.nextDate}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{row.nextSub}</p>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">--</span>
                )}
              </td>
              {/* Status */}
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── QR Code tab ──────────────────────────────────────────────────────────────

function QRCodeTab({ vehicle }) {
  const qrRef = useRef(null);
  const qrValue = `${vehicle.vehicle} | ${vehicle.registrationNumber}`;

  const downloadImage = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement("a");
      a.download = `${vehicle.registrationNumber}-qr.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const downloadPDF = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>${vehicle.registrationNumber} QR Code</title>
      <style>body{display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}</style>
      </head><body>${svg.outerHTML}</body></html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div ref={qrRef}>
        <QRCodeSVG value={qrValue} size={200} />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-105">
        <button
          onClick={downloadPDF}
          className="flex items-center justify-center gap-2 w-full py-4 bg-(--darkBlue) text-white rounded-xl text-sm font-bold cursor-pointer hover:opacity-90 transition"
        >
          <Download size={18} />
          Download as PDF
        </button>
        <button
          onClick={downloadImage}
          className="flex items-center justify-center gap-2 w-full py-4 border-2 border-(--darkBlue) text-(--darkBlue) rounded-xl text-sm font-bold cursor-pointer hover:bg-gray-50 transition"
        >
          <Download size={18} />
          Download as Image
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VehicleDetails({ vehicle, onClose, onEdit, onRemove }) {
  const [activeTab, setActiveTab] = useState("basic");
  const logo = getBrandLogo(vehicle.vehicle);

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-[28px] w-fit hover:opacity-75 transition cursor-pointer font-[title]"
      >
        <ArrowLeft size={28} strokeWidth={2.5} />
        Vehicle Details
      </button>

      {/* Vehicle identity row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-15 h-15 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
            <img src={logo} alt={vehicle.vehicle} className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{vehicle.vehicle}</p>
            <p className="text-sm text-gray-400 mt-0.5">{vehicle.registrationNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onEdit} className="flex items-center gap-2 text-(--blue) hover:opacity-70 transition cursor-pointer">
            <Pencil size={16} />
            <span className="text-sm font-semibold">Edit Details</span>
          </button>
          <button onClick={onRemove} className="flex items-center gap-2 text-(--red) hover:opacity-70 transition cursor-pointer">
            <Trash2 size={16} />
            <span className="text-sm font-semibold">Remove Vehicle</span>
          </button>
        </div>
      </div>

      {/* Tabbed card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-100 px-6">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-medium cursor-pointer transition-colors ${
                  active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon size={16} className={active ? "text-(--blue)" : "text-gray-400"} />
                {label}
                {active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--blue)" />}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="px-8 py-6">
          {activeTab === "basic"   && <BasicInfoTab vehicle={vehicle} />}
          {activeTab === "owner"   && <OwnerDetailsTab />}
          {activeTab === "history" && <ServiceHistoryTab />}
          {activeTab === "qr"      && <QRCodeTab vehicle={vehicle} />}
        </div>
      </div>
    </div>
  );
}
