import { useState, useRef } from "react";
import ServiceHistoryCard from "../../../components/ui/ServiceHistoryCard";
import StatusBadge from "../../../components/ui/StatusBadge";
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
import FileUploadField from "../../../components/auth/FileUploadField";
import { getBrandLogo } from "../../../utils/vehicleUtils";
import { getServiceIcon } from "../../../utils/serviceUtils";

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
  "1HGBH41JXMN109186",
  "2T1BURHE0JC042551",
  "3VWFE21C04M000001",
  "JM1GL1U52H1105739",
  "5YJSA1DG9DFP14705",
  "1G1BE5SM7H7242564",
  "WAUJF78P67A142669",
  "1FTEW1EF8GKE30789",
];
const getVIN = (reg) =>
  MOCK_VINS[parseInt(reg.replace(/\D/g, "") || "0") % MOCK_VINS.length];

// ─── Service icon map ─────────────────────────────────────────────────────────

// ─── Service History data ─────────────────────────────────────────────────────

const SERVICE_HISTORY_DATA = [
  {
    service: "Filter Change",
    serviceType: "Routine Services",
    lastDate: "31/09/2025",
    nextDate: "31/09/2025",
    nextSub: "Overdue by 2 weeks",
    status: "Overdue",
  },
  {
    service: "Suspension Check",
    serviceType: "Routine Services",
    lastDate: "31/09/2025",
    nextDate: "31/09/2025",
    nextSub: "Service is due today",
    status: "In Progress",
  },
  {
    service: "Battery Change",
    serviceType: "Repair",
    lastDate: "31/09/2025",
    nextDate: null,
    nextSub: null,
    status: "Completed",
  },
  {
    service: "Battery Check",
    serviceType: "Routine Services",
    lastDate: "31/09/2025",
    nextDate: "31/09/2025",
    nextSub: "Next service in 5 days",
    status: "Due Soon",
  },
  {
    service: "General Maintenance",
    serviceType: "Routine Services",
    lastDate: "31/09/2025",
    nextDate: "31/09/2025",
    nextSub: "Next service in 2 months",
    status: "Scheduled",
  },
  {
    service: "Transmission",
    serviceType: "Repair",
    lastDate: "31/09/2025",
    nextDate: null,
    nextSub: null,
    status: "Completed",
  },
  {
    service: "Radiator",
    serviceType: "Repair",
    lastDate: "31/09/2025",
    nextDate: null,
    nextSub: null,
    status: "Completed",
  },
  {
    service: "Electrical/Lighting",
    serviceType: "Repair",
    lastDate: "31/09/2025",
    nextDate: null,
    nextSub: null,
    status: "Completed",
  },
  {
    service: "Body Work",
    serviceType: "Repair",
    lastDate: "31/09/2025",
    nextDate: null,
    nextSub: null,
    status: "Completed",
  },
  {
    service: "Brake Inspection",
    serviceType: "Routine Services",
    lastDate: "31/09/2025",
    nextDate: "31/09/2025",
    nextSub: "Next service in 2 weeks",
    status: "Scheduled",
  },
  {
    service: "Oil Change",
    serviceType: "Routine Services",
    lastDate: "31/09/2025",
    nextDate: "31/09/2025",
    nextSub: "Next service in 1 month",
    status: "Scheduled",
  },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "basic", label: "Basic Info", icon: Car },
  { key: "owner", label: "Owner Details", icon: User },
  { key: "history", label: "Service History", icon: Key },
  { key: "qr", label: "QR Code", icon: QrCode },
];

// ─── Basic Info tab ───────────────────────────────────────────────────────────

function BasicInfoTab({ vehicle }) {
  const { make, model, year } = parseVehicle(vehicle.vehicle);
  const vin = getVIN(vehicle.registrationNumber);

  const fields = [
    { label: "Make", value: make },
    { label: "Model", value: model },
    { label: "Year", value: year },
    { label: "Registration/Plate Number", value: vehicle.registrationNumber },
    { label: "VIN", value: vin },
  ];

  return (
    <>
      {/* Mobile: single-column stacked list */}
      <div className="md:hidden flex flex-col divide-y py-1">
        {fields.map(({ label, value }) => (
          <div key={label} className="py-4">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <p className="text-base font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Desktop: original grid layout */}
      <div className="hidden md:flex flex-col gap-10 py-2">
        <div className="grid grid-cols-3">
          <div>
            <p className="text-sm text-gray-400 mb-1">Make</p>
            <p className="text-[15px] font-semibold text-gray-900">{make}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Model</p>
            <p className="text-[15px] font-semibold text-gray-900">{model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Year</p>
            <p className="text-[15px] font-semibold text-gray-900">{year}</p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              Registration/Plate Number
            </p>
            <p className="text-[15px] font-semibold text-gray-900">
              {vehicle.registrationNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">VIN</p>
            <p className="text-[15px] font-semibold text-gray-900">{vin}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Owner Details tab ────────────────────────────────────────────────────────

function OwnerDetailsTab() {
  const [regDoc, setRegDoc] = useState(null);
  const [driversLicense, setDriversLicense] = useState(null);
  return (
    <div className="flex flex-col gap-6 xl:gap-8 py-2">
      <div className="flex flex-col xl:grid xl:grid-cols-2 divide-y xl:divide-y-0 xl:gap-4">
        <div className="py-4 xl:py-0">
          <p className="text-sm text-gray-400 mb-1">Owner</p>
          <p className="text-base xl:text-[15px] font-semibold text-gray-900">
            Cynthia Ejike
          </p>
        </div>
        <div className="py-4 xl:py-0">
          <p className="text-sm text-gray-400 mb-1">Account Type</p>
          <p className="text-base xl:text-[15px] font-semibold text-gray-900">
            Individual Car Owner
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FileUploadField
          label="Vehicle Registration Document"
          fieldId="ownerRegDoc"
          fileName={regDoc}
          onFileChange={(e) => setRegDoc(e.target.files?.[0] || null)}
        />
        <FileUploadField
          label="Driver's License"
          fieldId="ownerDriversLicense"
          fileName={driversLicense}
          onFileChange={(e) => setDriversLicense(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}

// ─── Service History tab ──────────────────────────────────────────────────────

function ServiceHistoryTab() {
  const HEADERS = [
    "Service",
    "Service Type",
    "Last Service Date",
    "Next Service Date",
    "Status",
  ];
  return (
    <>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {SERVICE_HISTORY_DATA.map((row, i) => (
          <ServiceHistoryCard
            key={i}
            icon={getServiceIcon(row.service)}
            title={row.service}
            status={row.status}
            rows={[
              { label: "Service Type", value: row.serviceType },
              { label: "Last Service Date", value: row.lastDate },
              {
                label: "Next Service Date",
                value: row.nextDate || "--",
                subValue: row.nextSub,
              },
            ]}
          />
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-0">
          <thead>
            <tr className="border-b border-gray-100">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="text-left text-sm font-semibold text-[#3B82F6] px-4  py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICE_HISTORY_DATA.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className=" py-3">
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
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {row.serviceType}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {row.lastDate}
                </td>
                <td className="px-4 py-3">
                  {row.nextDate ? (
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        {row.nextDate}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {row.nextSub}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">--</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
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
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
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
    <div className="flex flex-col gap-4 xl:gap-5 flex-1">
      {/* Page header */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-xl xl:text-[28px] w-fit hover:opacity-75 transition cursor-pointer font-[title]"
      >
        <ArrowLeft size={22} strokeWidth={2.5} className="md:hidden" />
        <ArrowLeft size={28} strokeWidth={2.5} className="hidden md:block" />
        Vehicle Details
      </button>

      {/* Vehicle identity row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 xl:gap-4">
          <div className="w-12 h-12 xl:w-15 xl:h-15 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={logo}
              alt={vehicle.vehicle}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-base xl:text-xl font-bold text-gray-900">
              {vehicle.vehicle}
            </p>
            <p className="text-xs xl:text-sm text-gray-400 mt-0.5">
              {vehicle.registrationNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 xl:gap-6">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-(--blue) hover:opacity-70 transition cursor-pointer"
          >
            <Pencil size={15} />
            <span className="text-sm font-semibold">Edit Details</span>
          </button>
          <button
            onClick={onRemove}
            className="flex items-center gap-2 text-(--red) hover:opacity-70 transition cursor-pointer"
          >
            <Trash2 size={15} />
            <span className="text-sm font-semibold">Remove Vehicle</span>
          </button>
        </div>
      </div>

      {/* Tabbed card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1">
        {/* Tab bar */}
        <div className="flex border-b px-4 border-gray-100  overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-1.5 xl:gap-2 px-3 xl:px-5 py-3 xl:py-4 text-xs xl:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon
                  size={14}
                  className={active ? "text-(--blue)" : "text-gray-400"}
                />
                {label}
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-4xl bg-(--blue)" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="px-4 xl:px-8 py-4 xl:py-6">
          {activeTab === "basic" && <BasicInfoTab vehicle={vehicle} />}
          {activeTab === "owner" && <OwnerDetailsTab />}
          {activeTab === "history" && <ServiceHistoryTab />}
          {activeTab === "qr" && <QRCodeTab vehicle={vehicle} />}
        </div>
      </div>
    </div>
  );
}
