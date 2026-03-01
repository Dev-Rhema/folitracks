import React, { useState } from "react";
import Table from "../ui/Table";
import { CheckSquare, Clock, AlertTriangle, Filter } from "lucide-react";
import SearchBar from "./SearchBar";
import brakePadImg from "../../assets/dashboardImgs/dashHistory/brakePad.svg";
import suspensionImg from "../../assets/dashboardImgs/dashHistory/suspension.svg";
import diagnosticScanImg from "../../assets/dashboardImgs/dashHistory/diagnosticScan.svg";
import engineImg from "../../assets/dashboardImgs/dashHistory/engine.svg";
import fluidTopImg from "../../assets/dashboardImgs/dashHistory/fluidTop.svg";
import acImg from "../../assets/dashboardImgs/dashHistory/ac.svg";
import wheelAlignmentImg from "../../assets/dashboardImgs/dashHistory/wheel alignment.svg";
import exhaustImg from "../../assets/dashboardImgs/dashHistory/exhaust.svg";
import oilChangeImg from "../../assets/dashboardImgs/dashHistory/oilChange.svg";
import filterChangeImg from "../../assets/dashboardImgs/dashHistory/filterChange.svg";
import batteryCheckImg from "../../assets/dashboardImgs/dashHistory/batteryCheck.svg";
import generalMaintenance from "../../assets/dashboardImgs/dashHistory/generalMaint.svg";
import DashHeader from "./DashHeader";

const SERVICE_ICONS = [
  { name: "Brake Pad", image: brakePadImg },
  { name: "Brake Inspection", image: brakePadImg },
  { name: "Suspension", image: suspensionImg },
  { name: "Suspension Check", image: suspensionImg },
  { name: "Diagnostic Scan", image: diagnosticScanImg },
  { name: "Engine", image: engineImg },
  { name: "Fluid Top-up", image: fluidTopImg },
  { name: "AC Compartment", image: acImg },
  { name: "AC Services", image: acImg },
  { name: "General Maintenance", image: generalMaintenance },
  { name: "Wheel Alignment", image: wheelAlignmentImg },
  { name: "Exhaust System", image: exhaustImg },
  { name: "Oil Change", image: oilChangeImg },
  { name: "Air Filter", image: filterChangeImg },
  { name: "Filter Change", image: filterChangeImg },
  { name: "Battery Check", image: batteryCheckImg },
];

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

const renderServiceCell = (row) => {
  const serviceData = SERVICE_ICONS.find((s) => s.name === row.service) || {
    image: brakePadImg,
  };
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <img
        src={serviceData.image}
        alt={row.service}
        className="w-7 h-7 rounded-full object-cover shrink-0"
      />
      <span>{row.service}</span>
    </div>
  );
};

const renderVehicleCell = (row) => {
  const lines = row.vehicle.split("\n");
  return (
    <div>
      <div className="font-medium text-gray-800 text-sm">{lines[0]}</div>
      {lines[1] && <div className="text-xs text-gray-400">{lines[1]}</div>}
    </div>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────

const COMPLETED_DATA = [
  {
    sn: "01",
    service: "Brake Pad",
    vehicle: "Toyota Corolla 2010\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "02",
    service: "Suspension",
    vehicle: "Mercedes Benz CLA 2018\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "04",
    service: "Engine",
    vehicle: "Mercedes Benz GLE 2020\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "05",
    service: "Fluid Top-up",
    vehicle: "Hyundai Sonata 2010\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "06",
    service: "AC Compartment",
    vehicle: "Hyundai Sonata 2012\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "07",
    service: "AC Services",
    vehicle: "Lexus is250 2008\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "08",
    service: "Wheel Alignment",
    vehicle: "Lexus is350 2010\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "09",
    service: "Exhaust System",
    vehicle: "Ford F-150 2015\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "10",
    service: "Oil Change",
    vehicle: "Lexus RX350\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "11",
    service: "Brake Pad",
    vehicle: "BMW X5 2019\nLGS-6689422",
    date: "01/08/2025",
    cost: "₦12,000",
    serviceProvider: "Okorometa Ezekiel",
  },
  {
    sn: "12",
    service: "Engine",
    vehicle: "Audi A4 2018\nLGS-6689422",
    date: "01/08/2025",
    cost: "₦15,000",
    serviceProvider: "Okorometa Ezekiel",
  },
];

const UPCOMING_DATA = [
  {
    sn: "01",
    service: "Brake Inspection",
    vehicle: "Toyota Corolla 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: null,
    nextServiceSub: "Service in Progress",
    status: "In Progress",
  },
  {
    sn: "02",
    service: "Filter Change",
    vehicle: "Mercedes Benz CLA 2018\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Service is due today",
    status: "Due Today",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Service is due today",
    status: "Due Today",
  },
  {
    sn: "04",
    service: "Battery Check",
    vehicle: "Mercedes Benz GLE 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 days",
    status: "Due Soon",
  },
  {
    sn: "05",
    service: "Fluid Top-up",
    vehicle: "Hyundai Sonata 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 days",
    status: "Due Soon",
  },
  {
    sn: "06",
    service: "General Maintenance",
    vehicle: "Hyundai Sonata 2012\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 1 week",
    status: "Due Soon",
  },
  {
    sn: "07",
    service: "AC Services",
    vehicle: "Lexus is250 2008\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 2 weeks",
    status: "Scheduled",
  },
  {
    sn: "08",
    service: "Wheel Alignment",
    vehicle: "Lexus is350 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 1 month",
    status: "Scheduled",
  },
  {
    sn: "09",
    service: "Suspension Check",
    vehicle: "Ford F-150 2015\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 2 months",
    status: "Scheduled",
  },
  {
    sn: "10",
    service: "Oil Change",
    vehicle: "Lexus RX350\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
  },
  {
    sn: "11",
    service: "Brake Pad",
    vehicle: "BMW X5 2019\nLGS-6689422",
    lastServiceDate: "01/08/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
  },
  {
    sn: "12",
    service: "Engine",
    vehicle: "Audi A4 2018\nLGS-6689422",
    lastServiceDate: "01/08/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
  },
  {
    sn: "13",
    service: "Exhaust System",
    vehicle: "Toyota Camry 2017\nLGS-6689422",
    lastServiceDate: "01/07/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
  },
  {
    sn: "14",
    service: "Air Filter",
    vehicle: "Honda Civic 2016\nLGS-6689422",
    lastServiceDate: "01/07/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 months",
    status: "Scheduled",
  },
  {
    sn: "15",
    service: "Diagnostic Scan",
    vehicle: "Kia Sorento 2019\nLGS-6689422",
    lastServiceDate: "01/06/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 months",
    status: "Scheduled",
  },
];

const OVERDUE_DATA = [
  {
    sn: "01",
    service: "Brake Inspection",
    vehicle: "Toyota Corolla 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 5 days",
    status: "Overdue",
  },
  {
    sn: "02",
    service: "Filter Change",
    vehicle: "Mercedes Benz CLA 2018\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 5 days",
    status: "Overdue",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 5 days",
    status: "Overdue",
  },
  {
    sn: "04",
    service: "Battery Check",
    vehicle: "Mercedes Benz GLE 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
  },
  {
    sn: "05",
    service: "Fluid Top-up",
    vehicle: "Hyundai Sonata 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
  },
  {
    sn: "06",
    service: "Oil Change",
    vehicle: "Hyundai Sonata 2012\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
  },
  {
    sn: "07",
    service: "AC Services",
    vehicle: "Lexus is250 2008\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
  },
  {
    sn: "08",
    service: "Wheel Alignment",
    vehicle: "Lexus is350 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 1 month",
    status: "Overdue",
  },
  {
    sn: "09",
    service: "Suspension Check",
    vehicle: "Ford F-150 2015\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 1 month",
    status: "Overdue",
  },
  {
    sn: "10",
    service: "Air Filter",
    vehicle: "Lexus RX350\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 months",
    status: "Overdue",
  },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  {
    name: "Completed",
    count: COMPLETED_DATA.length,
    key: "completed",
    icon: CheckSquare,
  },
  {
    name: "Upcoming",
    count: UPCOMING_DATA.length,
    key: "upcoming",
    icon: Clock,
  },
  {
    name: "Overdue",
    count: OVERDUE_DATA.length,
    key: "overdue",
    icon: AlertTriangle,
  },
];

// ─── Column definitions ───────────────────────────────────────────────────────

const COMPLETED_COLUMNS = [
  { key: "sn", label: "S/N" },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "date", label: "Date" },
  { key: "cost", label: "Cost" },
  { key: "serviceProvider", label: "Service Provider" },
];

const UPCOMING_COLUMNS = [
  { key: "sn", label: "S/N" },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "lastServiceDate", label: "Last Service Date" },
  {
    key: "nextServiceDate",
    label: "Next Service Date",
    render: (row) => (
      <div>
        {row.nextServiceDate && (
          <div className="font-medium text-gray-800 text-sm">
            {row.nextServiceDate}
          </div>
        )}
        <div
          className={
            row.nextServiceDate
              ? "text-xs text-gray-400"
              : "text-sm text-gray-800 font-medium"
          }
        >
          {row.nextServiceSub}
        </div>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const OVERDUE_COLUMNS = [
  { key: "sn", label: "S/N" },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "lastServiceDate", label: "Last Service Date" },
  {
    key: "missedServiceDate",
    label: "Missed Service Date",
    render: (row) => (
      <div>
        <div className="font-medium text-gray-800 text-sm">
          {row.missedServiceDate}
        </div>
        <div className="text-xs text-gray-400">{row.missedServiceSub}</div>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function ServiceHistory() {
  const [activeTab, setActiveTab] = useState("completed");
  const [searchTerm, setSearchTerm] = useState("");

  const getTabData = () => {
    switch (activeTab) {
      case "upcoming":
        return UPCOMING_DATA;
      case "overdue":
        return OVERDUE_DATA;
      default:
        return COMPLETED_DATA;
    }
  };

  const getTabColumns = () => {
    switch (activeTab) {
      case "upcoming":
        return UPCOMING_COLUMNS;
      case "overdue":
        return OVERDUE_COLUMNS;
      default:
        return COMPLETED_COLUMNS;
    }
  };

  const handleActionClick = (row) => {
    console.log("Action clicked for:", row);
  };

  return (
    <div>
      <DashHeader title="Service History" />
      {/* Header: Tabs left, Search + Filter right */}
      <div className="bg-white p-3 lg:p-4 rounded-2xl flex flex-col gap-3 lg:gap-4">
        <div className="flex items-end justify-between">
          {/* Tabs */}
          <div className="flex gap-4 lg:gap-8">
            {TABS.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSearchTerm("");
                  }}
                  className={`cursor-pointer relative font-medium flex items-center gap-1 lg:gap-2 pb-2 lg:pb-3 text-xs lg:text-base transition-colors ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.key !== "completed" && (
                    <span className="absolute -top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                  <IconComponent size={16} />
                  <span>
                    {tab.name} ({tab.count})
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-3xl bg-(--blue)" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-2 lg:gap-3 pb-2 lg:pb-3">
            <SearchBar
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-32 lg:w-72"
            />
            <button className="px-2 lg:px-4 py-1.5 lg:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1 lg:gap-2 text-xs lg:text-sm text-gray-600 font-medium cursor-pointer">
              <Filter size={12} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={getTabColumns()}
          data={getTabData()}
          rowsPerPage={10}
          onActionClick={handleActionClick}
          showSearch={false}
          searchTerm={searchTerm}
          searchableFields={[
            "service",
            "vehicle",
            "lastServiceDate",
            "date",
            "serviceProvider",
            "status",
            "nextServiceSub",
            "missedServiceSub",
          ]}
        />
      </div>
    </div>
  );
}

export default ServiceHistory;
