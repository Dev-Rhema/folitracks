import { useState } from "react";
import Table from "../../components/ui/Table";
import ServiceHistoryCard from "../../components/ui/ServiceHistoryCard";
import StatusBadge from "../../components/ui/StatusBadge";
import ServiceDetailsView from "./components/ServiceDetailsView";
import { CheckSquare, Clock, AlertTriangle } from "lucide-react";
import FilterDropdown from "../../components/ui/FilterDropdown";
import RescheduleServiceModal from "./components/RescheduleServiceModal";
import SetReminderModal from "./components/SetReminderModal";

import SearchBar from "./components/SearchBar";
import DashHeader from "./components/DashHeader";
import { getServiceIcon } from "../../utils/serviceUtils";

const REPAIR_SERVICES = [
  "Brake Pad",
  "Suspension",
  "Engine",
  "Wheel Alignment",
  "Exhaust System",
  "AC Compartment",
];
const ROUTINE_SERVICES = [
  "Diagnostic Scan",
  "Fluid Top-up",
  "Oil Change",
  "AC Services",
  "Air Filter",
];

const COMPLETED_VEHICLE_MAKES = [
  "Audi",
  "BMW",
  "Ford",
  "Hyundai",
  "Lexus",
  "Mercedes Benz",
  "Toyota",
];

const UPCOMING_OVERDUE_VEHICLE_MAKES = [
  "Toyota", "Mercedes Benz", "BMW", "Hyundai", "Lexus", "Ford", "Audi", "Honda", "Kia",
];

const UPCOMING_STATUSES = ["In Progress", "Due Today", "Due Soon", "Scheduled"];

const SERVICE_TYPE_ACCORDION = {
  label: "Service Type",
  type: "accordion",
  groups: [
    { label: "Repairs", services: REPAIR_SERVICES },
    { label: "Routine Service", services: ROUTINE_SERVICES },
  ],
};

const COMPLETED_FILTER_CATEGORIES = [
  SERVICE_TYPE_ACCORDION,
  { label: "Vehicle Make", type: "list", options: COMPLETED_VEHICLE_MAKES },
  { label: "Date Range", type: "calendar" },
  { label: "Price Range", type: "priceRange" },
];

const UPCOMING_FILTER_CATEGORIES = [
  SERVICE_TYPE_ACCORDION,
  { label: "Vehicle Make", type: "list", options: UPCOMING_OVERDUE_VEHICLE_MAKES },
  { label: "Status", type: "list", options: UPCOMING_STATUSES },
  { label: "Date Range", type: "calendar" },
];

const OVERDUE_FILTER_CATEGORIES = [
  SERVICE_TYPE_ACCORDION,
  { label: "Vehicle Make", type: "list", options: UPCOMING_OVERDUE_VEHICLE_MAKES },
  { label: "Date Range", type: "calendar" },
];

const renderServiceCell = (row) => (
  <div className="flex items-center gap-2 lg:gap-3">
    <img
      src={getServiceIcon(row.service)}
      alt={row.service}
      className="w-7 h-7 rounded-full object-cover shrink-0"
    />
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
    date: "21/06/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Christian",
    serviceType: "Repair/Replacement Service",
    note: "Brake pads replaced. Front rotors in good condition.",
  },
  {
    sn: "02",
    service: "Suspension",
    vehicle: "Mercedes Benz CLA 2018\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "Suspension components inspected and adjusted.",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Routine Service",
    note: "Full diagnostic scan completed. No issues found.",
  },
  {
    sn: "04",
    service: "Engine",
    vehicle: "Mercedes Benz GLE 2020\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "Engine service completed successfully.",
  },
  {
    sn: "05",
    service: "Fluid Top-up",
    vehicle: "Hyundai Sonata 2010\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Routine Service",
    note: "All fluids topped up to recommended levels.",
  },
  {
    sn: "06",
    service: "AC Compartment",
    vehicle: "Hyundai Sonata 2012\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "AC system serviced and refrigerant recharged.",
  },
  {
    sn: "07",
    service: "AC Services",
    vehicle: "Lexus is250 2008\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Routine Service",
    note: "AC filter replaced and system cleaned.",
  },
  {
    sn: "08",
    service: "Wheel Alignment",
    vehicle: "Lexus is350 2010\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "Wheel alignment adjusted to factory specifications.",
  },
  {
    sn: "09",
    service: "Exhaust System",
    vehicle: "Ford F-150 2015\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "Exhaust system inspected and repaired.",
  },
  {
    sn: "10",
    service: "Oil Change",
    vehicle: "Lexus RX350\nLGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Routine Service",
    note: "Premium synthetic oil and new filter installed.",
  },
  {
    sn: "11",
    service: "Brake Pad",
    vehicle: "BMW X5 2019\nLGS-6689422",
    date: "01/08/2025",
    cost: "₦12,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "Brake pads replaced with OEM parts.",
  },
  {
    sn: "12",
    service: "Engine",
    vehicle: "Audi A4 2018\nLGS-6689422",
    date: "01/08/2025",
    cost: "₦15,000",
    serviceProvider: "Okorometa Ezekiel",
    serviceType: "Repair/Replacement Service",
    note: "Engine overhaul completed.",
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
    cost: "₦8,000",
    serviceType: "Routine Service",
  },
  {
    sn: "02",
    service: "Filter Change",
    vehicle: "Mercedes Benz CLA 2018\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Service is due today",
    status: "Due Today",
    cost: "₦5,000",
    serviceType: "Routine Service",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020\nLGS-6689422",
    lastServiceDate: "21/06/2025",
    nextServiceDate: "21/09/2015",
    nextServiceSub: "Next Service in 2 months",
    status: "Scheduled",
    cost: "₦10,000",
    serviceType: "Preventive/Routine Service",
  },
  {
    sn: "04",
    service: "Battery Check",
    vehicle: "Mercedes Benz GLE 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 days",
    status: "Due Soon",
    cost: "₦3,000",
    serviceType: "Routine Service",
  },
  {
    sn: "05",
    service: "Fluid Top-up",
    vehicle: "Hyundai Sonata 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 days",
    status: "Due Soon",
    cost: "₦2,500",
    serviceType: "Routine Service",
  },
  {
    sn: "06",
    service: "General Maintenance",
    vehicle: "Hyundai Sonata 2012\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 1 week",
    status: "Due Soon",
    cost: "₦12,000",
    serviceType: "Routine Service",
  },
  {
    sn: "07",
    service: "AC Services",
    vehicle: "Lexus is250 2008\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 2 weeks",
    status: "Scheduled",
    cost: "₦7,500",
    serviceType: "Routine Service",
  },
  {
    sn: "08",
    service: "Wheel Alignment",
    vehicle: "Lexus is350 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 1 month",
    status: "Scheduled",
    cost: "₦9,000",
    serviceType: "Repair/Maintenance Service",
  },
  {
    sn: "09",
    service: "Suspension Check",
    vehicle: "Ford F-150 2015\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 2 months",
    status: "Scheduled",
    cost: "₦10,500",
    serviceType: "Routine Service",
  },
  {
    sn: "10",
    service: "Oil Change",
    vehicle: "Lexus RX350\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
    cost: "₦6,000",
    serviceType: "Routine Service",
  },
  {
    sn: "11",
    service: "Brake Pad",
    vehicle: "BMW X5 2019\nLGS-6689422",
    lastServiceDate: "01/08/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
    cost: "₦11,000",
    serviceType: "Repair/Maintenance Service",
  },
  {
    sn: "12",
    service: "Engine",
    vehicle: "Audi A4 2018\nLGS-6689422",
    lastServiceDate: "01/08/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
    cost: "₦18,000",
    serviceType: "Repair/Maintenance Service",
  },
  {
    sn: "13",
    service: "Exhaust System",
    vehicle: "Toyota Camry 2017\nLGS-6689422",
    lastServiceDate: "01/07/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 3 months",
    status: "Scheduled",
    cost: "₦14,000",
    serviceType: "Repair/Maintenance Service",
  },
  {
    sn: "14",
    service: "Air Filter",
    vehicle: "Honda Civic 2016\nLGS-6689422",
    lastServiceDate: "01/07/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 months",
    status: "Scheduled",
    cost: "₦4,500",
    serviceType: "Routine Service",
  },
  {
    sn: "15",
    service: "Diagnostic Scan",
    vehicle: "Kia Sorento 2019\nLGS-6689422",
    lastServiceDate: "01/06/2025",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Next Service in 4 months",
    status: "Scheduled",
    cost: "₦6,500",
    serviceType: "Routine Service",
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
    cost: "₦8,000",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 5 days",
  },
  {
    sn: "02",
    service: "Filter Change",
    vehicle: "Mercedes Benz CLA 2018\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 5 days",
    status: "Overdue",
    cost: "₦5,000",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 5 days",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 5 days",
    status: "Overdue",
    cost: "₦6,000",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 5 days",
  },
  {
    sn: "04",
    service: "Battery Check",
    vehicle: "Mercedes Benz GLE 2020\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
    cost: "₦3,000",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 2 weeks",
  },
  {
    sn: "05",
    service: "Fluid Top-up",
    vehicle: "Hyundai Sonata 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
    cost: "₦2,500",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 2 weeks",
  },
  {
    sn: "06",
    service: "Oil Change",
    vehicle: "Hyundai Sonata 2012\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
    cost: "₦4,500",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 2 weeks",
  },
  {
    sn: "07",
    service: "AC Services",
    vehicle: "Lexus is250 2008\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 weeks",
    status: "Overdue",
    cost: "₦7,500",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 2 weeks",
  },
  {
    sn: "08",
    service: "Wheel Alignment",
    vehicle: "Lexus is350 2010\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 1 month",
    status: "Overdue",
    cost: "₦9,000",
    serviceType: "Repair/Maintenance Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 1 month",
  },
  {
    sn: "09",
    service: "Suspension Check",
    vehicle: "Ford F-150 2015\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 1 month",
    status: "Overdue",
    cost: "₦10,500",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 1 month",
  },
  {
    sn: "10",
    service: "Air Filter",
    vehicle: "Lexus RX350\nLGS-6689422",
    lastServiceDate: "01/09/2025",
    missedServiceDate: "01/12/2025",
    missedServiceSub: "Overdue by 2 months",
    status: "Overdue",
    cost: "₦3,500",
    serviceType: "Routine Service",
    nextServiceDate: "01/12/2025",
    nextServiceSub: "Overdue by 2 months",
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
  const [filterValues, setFilterValues] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rescheduleRow, setRescheduleRow] = useState(null);
  const [setReminderRow, setSetReminderRow] = useState(null);

  const handleFilterChange = (category, value) => {
    setFilterValues((prev) => ({ ...prev, [category]: value }));
  };

  const getTabData = () => {
    let data;
    switch (activeTab) {
      case "upcoming":
        data = UPCOMING_DATA;
        break;
      case "overdue":
        data = OVERDUE_DATA;
        break;
      default:
        data = COMPLETED_DATA;
    }
    // Service Type filter (shared across tabs)
    const svcFilter = filterValues["Service Type"];
    if (svcFilter) {
      if (svcFilter.service) {
        data = data.filter((row) => row.service === svcFilter.service);
      } else if (svcFilter.group === "Repairs") {
        data = data.filter((row) => REPAIR_SERVICES.includes(row.service));
      } else if (svcFilter.group === "Routine Service") {
        data = data.filter((row) => ROUTINE_SERVICES.includes(row.service));
      }
    }
    // Vehicle Make filter (shared across tabs)
    const makeFilter = filterValues["Vehicle Make"];
    if (makeFilter) {
      data = data.filter((row) =>
        row.vehicle.toLowerCase().includes(makeFilter.toLowerCase()),
      );
    }
    // Date Range filter
    const dateFilter = filterValues["Date Range"];
    if (dateFilter?.start) {
      data = data.filter((row) => {
        const rawDate =
          row.date || row.lastServiceDate || row.lastDate || "";
        const [d, m, y] = rawDate.split("/");
        const iso = `${y}-${m}-${d}`;
        if (dateFilter.end)
          return iso >= dateFilter.start && iso <= dateFilter.end;
        return iso === dateFilter.start;
      });
    }
    if (activeTab === "completed") {
      // Price Range filter (completed only)
      const priceFilter = filterValues["Price Range"];
      if (priceFilter) {
        data = data.filter((row) => {
          const cost = parseInt(row.cost.replace(/[₦,]/g, ""), 10);
          return cost >= priceFilter.min && cost <= priceFilter.max;
        });
      }
    }
    if (activeTab === "upcoming") {
      // Status filter (upcoming only)
      const statusFilter = filterValues["Status"];
      if (statusFilter) {
        data = data.filter((row) => row.status === statusFilter);
      }
    }
    return data;
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

  const handleActionClick = (row, action) => {
    if (action === "view") {
      const [vehicleName, vehicleReg] = row.vehicle.split("\n");
      setSelectedVehicle({ vehicle: vehicleName, registrationNumber: vehicleReg });
      setSelectedService(row);
    } else if (action === "set_reminder") {
      setSetReminderRow(row);
    } else if (action === "reschedule") {
      setRescheduleRow(row);
    }
  };

  const getMobileFilteredData = () => {
    const data = getTabData();
    if (!searchTerm.trim()) return data;
    const s = searchTerm.toLowerCase();
    return data.filter((row) =>
      [
        "service",
        "vehicle",
        "lastServiceDate",
        "date",
        "serviceProvider",
        "status",
        "nextServiceSub",
        "missedServiceSub",
      ].some((field) => row[field]?.toLowerCase().includes(s)),
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
        {
          label: "Next Service Date",
          value: row.nextServiceDate,
          subValue: row.nextServiceSub,
        },
      ];
    }
    return [
      { label: "Vehicle", value: vehicleName, subValue: vehicleReg },
      { label: "Last Service Date", value: row.lastServiceDate },
      {
        label: "Missed Service Date",
        value: row.missedServiceDate,
        subValue: row.missedServiceSub,
      },
    ];
  };

  return (
    <div className="flex flex-col flex-1">
      {selectedService && selectedVehicle ? (
        <div className="flex-1 flex flex-col">
          <ServiceDetailsView
            vehicle={selectedVehicle}
            service={selectedService}
            onClose={() => {
              setSelectedService(null);
              setSelectedVehicle(null);
            }}
            isUpcoming={activeTab === "upcoming"}
            isOverdue={activeTab === "overdue"}
          />
        </div>
      ) : (
        <>
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
                  className="w-55 xl:w-75"
                />
                <FilterDropdown
                  categories={
                    activeTab === "completed"
                      ? COMPLETED_FILTER_CATEGORIES
                      : activeTab === "upcoming"
                        ? UPCOMING_FILTER_CATEGORIES
                        : OVERDUE_FILTER_CATEGORIES
                  }
                  values={filterValues}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {getMobileFilteredData().map((row, i) => {
                const mobileActions = { onViewDetails: () => handleActionClick(row, "view") };

                return (
                  <ServiceHistoryCard
                    key={i}
                    icon={getServiceIcon(row.service)}
                    title={row.service}
                    status={
                      activeTab === "completed" ? "Completed" : row.status
                    }
                    rows={getMobileRows(row)}
                    {...mobileActions}
                  />
                );
              })}
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
                availableActions={
                  activeTab === "completed"
                    ? ["view"]
                    : activeTab === "overdue"
                      ? ["view", "reschedule"]
                      : ["view", "set_reminder", "reschedule"]
                }
              />
            </div>
          </div>
        </>
      )}

      <RescheduleServiceModal
        row={rescheduleRow}
        onClose={() => setRescheduleRow(null)}
      />
      <SetReminderModal
        row={setReminderRow}
        onClose={() => setSetReminderRow(null)}
      />
    </div>
  );
}

export default ServiceHistory;
