import { Link } from "react-router-dom";
import DashHeader from "./DashHeader";
import Table from "../ui/Table";
import countImg1 from "../../assets/dashboardImgs/dashHome/Desktop/dashCount1.svg";
import countImg2 from "../../assets/dashboardImgs/dashHome/Desktop/dashCount2.svg";
import countImg3 from "../../assets/dashboardImgs/dashHome/Desktop/dashCount3.svg";
import { imageUrls } from "../../config/imageUrls";
import brakePadImg from "../../assets/dashboardImgs/dashHistory/brakePad.svg";
import suspensionImg from "../../assets/dashboardImgs/dashHistory/suspension.svg";
import diagnosticScanImg from "../../assets/dashboardImgs/dashHistory/diagnosticScan.svg";
import engineImg from "../../assets/dashboardImgs/dashHistory/engine.svg";
import fluidTopImg from "../../assets/dashboardImgs/dashHistory/fluidTop.svg";
import acImg from "../../assets/dashboardImgs/dashHistory/ac.svg";
import oilChangeImg from "../../assets/dashboardImgs/dashHistory/oilChange.svg";
import filterChangeImg from "../../assets/dashboardImgs/dashHistory/filterChange.svg";
import batteryCheckImg from "../../assets/dashboardImgs/dashHistory/batteryCheck.svg";
import wheelAlignmentImg from "../../assets/dashboardImgs/dashHistory/wheel alignment.svg";
import exhaustImg from "../../assets/dashboardImgs/dashHistory/exhaust.svg";
import generalMaintImg from "../../assets/dashboardImgs/dashHistory/generalMaint.svg";

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

// ─── Service icons ────────────────────────────────────────────────────────────

const SERVICE_ICON_MAP = [
  { name: "Brake Pad", image: brakePadImg },
  { name: "Brake Inspection", image: brakePadImg },
  { name: "Suspension", image: suspensionImg },
  { name: "Suspension Check", image: suspensionImg },
  { name: "Diagnostic Scan", image: diagnosticScanImg },
  { name: "Engine", image: engineImg },
  { name: "Fluid Top-up", image: fluidTopImg },
  { name: "AC Compartment", image: acImg },
  { name: "AC Services", image: acImg },
  { name: "General Maintenance", image: generalMaintImg },
  { name: "Wheel Alignment", image: wheelAlignmentImg },
  { name: "Exhaust System", image: exhaustImg },
  { name: "Oil Change", image: oilChangeImg },
  { name: "Air Filter", image: filterChangeImg },
  { name: "Filter Change", image: filterChangeImg },
  { name: "Battery Check", image: batteryCheckImg },
];

const getServiceIcon = (name) =>
  SERVICE_ICON_MAP.find((s) => s.name === name)?.image || brakePadImg;

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  "In Progress": "bg-purple-100 text-purple-600",
  "Due Today": "bg-orange-100 text-orange-500",
  "Due Soon": "bg-orange-50 text-orange-500",
  Scheduled: "bg-teal-50 text-teal-500",
  Overdue: "bg-red-50 text-red-500",
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

// ─── Static preview data ──────────────────────────────────────────────────────

const MY_VEHICLES_PREVIEW = [
  { vehicle: "Lexus is250 2008", reg: "LGS-142673" },
  { vehicle: "Toyota Camry 2010", reg: "LGS-238491" },
  { vehicle: "Ford Explorer 2019", reg: "LGS-374820" },
];

const UPCOMING_PREVIEW = [
  {
    service: "Suspension Check",
    vehicle: "Lexus IS250 2008",
    status: "Due Today",
  },
  { service: "Fluid Top-up", vehicle: "Lexus IS250 2008", status: "Due Soon" },
  { service: "Oil Change", vehicle: "Lexus IS250 2008", status: "Scheduled" },
];

const HISTORY_PREVIEW = [
  {
    sn: "01",
    service: "Brake Pad",
    vehicle: "Toyota Corolla 2010",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
  },
  {
    sn: "02",
    service: "Suspension",
    vehicle: "Mercedes Benz CLA 2018",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
  },
  {
    sn: "04",
    service: "Engine",
    vehicle: "Mercedes Benz GLE 2020",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
  },
];

// ─── Count cards ──────────────────────────────────────────────────────────────

const DASHCOUNT = [
  { id: 1, name: "Number of Vehicles", num: 4, img: countImg1 },
  { id: 2, name: "Upcoming Services", num: 20, img: countImg2 },
  { id: 3, name: "Overdue Services", num: 8, img: countImg3 },
];

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ title, to }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <Link
        to={to}
        className="text-sm text-blue-500 hover:underline font-medium"
      >
        View all
      </Link>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

// Render functions for table cells
const renderServiceCell = (row) => (
  <div className="flex items-center gap-3">
    <img
      src={getServiceIcon(row.service)}
      alt={row.service}
      className="w-9 h-9 rounded-full object-cover shrink-0"
    />
    <span className="text-sm text-gray-800">{row.service}</span>
  </div>
);

const renderVehicleCell = (row) => (
  <div>
    <p className="text-sm font-medium text-gray-800">{row.vehicle}</p>
    <p className="text-xs text-gray-400">{row.reg}</p>
  </div>
);

// Table columns for history
const HISTORY_COLUMNS = [
  { key: "sn", label: "S/N" },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "date", label: "Date" },
  { key: "cost", label: "Cost" },
  { key: "provider", label: "Service Provider" },
];

export default function Dashboard() {
  return (
    <div className="">
      <DashHeader
        title="Welcome Cynthia 👋"
        subtitle="Manage your vehicles, track service history, set maintenance reminders all in one place."
      />

      {/* Count cards */}
      <div className="py-6 rounded-2xl flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          {DASHCOUNT.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border py-4 px-8 rounded-2xl bg-white"
            >
              <img src={item.img} alt="" />
              <div className="flex flex-col">
                <p className="text-sm text-gray-600">{item.name}</p>
                <p className="text-3xl font-bold text-gray-900">{item.num}</p>
              </div>
            </div>
          ))}
        </div>

        {/* My Vehicles + Upcoming Services */}
        <div className="grid grid-cols-2 gap-8">
          {/* My Vehicles */}
          <div className="">
            <SectionHeader title="My Vehicles" to="/dashboard/vehicles" />
            <div className="bg-white border rounded-2xl p-5 ">
              {MY_VEHICLES_PREVIEW.map((v, i) => {
                const logo = getBrandLogo(v.vehicle);
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-3 ${
                      i < MY_VEHICLES_PREVIEW.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={logo}
                          alt={v.vehicle}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {v.vehicle}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{v.reg}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Services */}
          <div className="">
            <SectionHeader
              title="Upcoming Services "
              to="/dashboard/service-history"
            />
            <div className="bg-white border rounded-2xl p-5 ">
              {UPCOMING_PREVIEW.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-3 ${
                    i < UPCOMING_PREVIEW.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getServiceIcon(item.service)}
                      alt={item.service}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.service}
                      </p>
                      <p className="text-xs text-gray-400">{item.vehicle}</p>
                    </div>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service History */}
        <div>
          <SectionHeader
            title="Service History"
            to="/dashboard/service-history"
          />
          <Table
            columns={HISTORY_COLUMNS}
            data={HISTORY_PREVIEW}
            rowsPerPage={4}
            showSearch={false}
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
}
