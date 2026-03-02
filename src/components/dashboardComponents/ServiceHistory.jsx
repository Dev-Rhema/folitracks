import { useState } from "react";
import Table from "../ui/Table";
import ServiceHistoryCard from "../ui/ServiceHistoryCard";
import StatusBadge from "../ui/StatusBadge";
import { CheckSquare, Clock, AlertTriangle, Filter } from "lucide-react";
import SearchBar from "./SearchBar";
import DashHeader from "./DashHeader";
import { getServiceIcon } from "../../utils/serviceUtils";

const renderServiceCell = (row) => (
  <div className="flex items-center gap-2 lg:gap-3">
    <img src={getServiceIcon(row.service)} alt={row.service} className="w-7 h-7 rounded-full object-cover shrink-0" />
    <span>{row.service}</span>
  </div>
);

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

  const getMobileFilteredData = () => {
    const data = getTabData();
    if (!searchTerm.trim()) return data;
    const s = searchTerm.toLowerCase();
    return data.filter((row) =>
      ["service", "vehicle", "lastServiceDate", "date", "serviceProvider", "status", "nextServiceSub", "missedServiceSub"]
        .some((field) => row[field]?.toLowerCase().includes(s))
    );
  };

  const getMobileRows = (row) => {
    const [vehicleName, vehicleReg] = row.vehicle.split("\n");
    if (activeTab === "completed") {
      return [
        { label: "Vehicle", value: vehicleName, subValue: vehicleReg },
        { label: "Date", value: row.date },
        { label: "Cost", value: row.cost },
        { label: "Service Provider", value: row.serviceProvider },
      ];
    }
    if (activeTab === "upcoming") {
      return [
        { label: "Vehicle", value: vehicleName, subValue: vehicleReg },
        { label: "Last Service Date", value: row.lastServiceDate },
        { label: "Next Service Date", value: row.nextServiceDate, subValue: row.nextServiceSub },
      ];
    }
    return [
      { label: "Vehicle", value: vehicleName, subValue: vehicleReg },
      { label: "Last Service Date", value: row.lastServiceDate },
      { label: "Missed Service Date", value: row.missedServiceDate, subValue: row.missedServiceSub },
    ];
  };

  return (
    <div>
      <DashHeader title="Service History" />
      {/* Header: Tabs left, Search + Filter right */}
      <div className="bg-white p-3 lg:p-4 rounded-2xl flex flex-col gap-3 lg:gap-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-0">
          {/* Tabs */}
          <div className="flex gap-4 lg:gap-8 border-b lg:border-b-0">
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
          <div className="flex items-center gap-2 lg:gap-3 lg:pb-3">
            <SearchBar
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 lg:w-52"
            />
            <button className="px-3 lg:px-4 py-1.5 lg:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm text-gray-600 font-medium cursor-pointer shrink-0">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {getMobileFilteredData().map((row, i) => (
            <ServiceHistoryCard
              key={i}
              icon={getServiceIcon(row.service)}
              title={row.service}
              status={activeTab === "completed" ? "Completed" : row.status}
              rows={getMobileRows(row)}
              onViewDetails={() => handleActionClick(row)}
            />
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
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
    </div>
  );
}

export default ServiceHistory;
