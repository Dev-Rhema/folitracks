import { useState } from "react";
import Table from "../../../../components/ui/Table";
import StatusBadge from "../../../../components/ui/StatusBadge";
import ServiceDetailsView from "./components/ServiceDetailsView";
import { CheckSquare, Clock, AlertTriangle } from "lucide-react";
import FilterDropdown from "../../../../components/ui/FilterDropdown";
import SearchBar from "../components/SearchBar";
import DashHeader from "../components/DashHeader";
import { useAdminGetServiceHistoryQuery } from "../../../../redux/api/serviceHistoryApiSlice";
import { getServiceIcon } from "../../../../utils/serviceUtils";
import useGet from "../../../../hooks/useGet";
import { capitalizeFirstLetter } from "../../../../utils/utils";
import TableActionMenu from "../../../../components/ui/TableActionMenu";
import { toast } from "react-toastify";
import Loader from "../../../../components/ui/Loader";

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
  const vehicle = row.vehicle;

  console.log(row);

  return (
    <div>
      <div className="font-medium text-gray-800 text-sm">{vehicle?.make} {vehicle?.vehicleModel} {vehicle?.yearOfManufacture}</div>
      {vehicle?.plateNumber && <div className="text-xs text-gray-400">{vehicle?.plateNumber}</div>}
    </div>
  );
};


const renderOwnerCell = (row) => {
  return capitalizeFirstLetter(row?.user[0]?.fullname);
}


const COMPLETED_COLUMNS = [
  { key: "sn", label: "S/N" },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "date", label: "Date" },
  { key: "cost", label: "Cost" },
  { key: "serviceProvider", label: "Service Provider" },
];

const UPCOMING_COLUMNS = [
  { key: "sn", label: "S/N", render: (row, index,) => index + 1 },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "owner", label: "Owner", render: renderOwnerCell },
  {
    key: "nextServiceDate",
    label: "Next Service Date",
    render: (row) => (
      <div className="font-medium text-gray-800 text-sm">
        {row.nextServiceDate || "N/A"}
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.serviceStatus} />,
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
    render: (row) => <StatusBadge status={row.serviceStatus || "Overdue"} />,
  },
];

function ServiceHistory() {
  const [activeTab, setActiveTab] = useState("completed");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rescheduleRow, setRescheduleRow] = useState(null);
  const [page, setPage] = useState(1);


  const { data: serviceHistories, loading: loadingServiceHistories } = useGet(useAdminGetServiceHistoryQuery)

  const allServices = serviceHistories?.serviceHistory || [];

  const COMPLETED_DATA = allServices
    .filter((s) => s.serviceStatus === "Completed");

  const OVERDUE_DATA = allServices
    .filter((s) => s.serviceStatus === "Overdue");

  const UPCOMING_DATA = allServices
    .filter((s) => s.serviceStatus !== "Completed" && s.serviceStatus !== "Overdue");

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
        const [d, m, y] = rawDate?.split("/");
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
        data = data.filter((row) => row.serviceStatus === statusFilter);
      }
    }
    return data;
  };

  const getTabColumns = () => {
    let columns = [];

    switch (activeTab) {
      case "upcoming":
        columns = UPCOMING_COLUMNS;
        break;
      case "overdue":
        columns = OVERDUE_COLUMNS;
        break;
      default:
        columns = COMPLETED_COLUMNS;
    }

    const actionColumn = {
      key: "actions",
      label: "Action",
      className: "text-right",
      render: (row) => {
        const actions = [
          {
            label: "View Details",
            onClick: (r) => handleActionClick(r, "view"),
          },
        ];

        if (activeTab === "upcoming") {
          actions.push({
            label: "Reschedule",
            onClick: (r) => handleActionClick(r, "reschedule"),
          });
          actions.push({
            label: "Change Status",
            subActions: [
              {
                label: "Start Service",
                onClick: (r) => {
                  toast.info(`Starting service for ${r.service}`);
                },
              },
              {
                label: "Complete Service",
                onClick: (r) => {
                  toast.success(`Service completed for ${r.service}`);
                },
              },
            ],
          });
        }

        if (activeTab === "overdue") {
          actions.push({
            label: "Reschedule",
            onClick: (r) => handleActionClick(r, "reschedule"),
          });
        }

        return <TableActionMenu actions={actions} row={row} />;
      },
    };

    return [...columns, actionColumn];
  };

  const handleActionClick = (row, action) => {
    if (action === "view") {
      setSelectedVehicle(row.vehicle);
      setSelectedService(row);
    } else if (action === "reschedule") {
      setRescheduleRow(row);
    } else if (action === "set_reminder") {
      // Assuming you have a setReminderRow state or podobné
      // Looking at the view_file, there was setReminderRow in the older version
    }
  };

  if(loadingServiceHistories) {
    return <Loader />
  }

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

          <div className="bg-white p-3 lg:p-4 rounded-2xl flex flex-col gap-3 lg:gap-4">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-0 border-b max-lg:border-b-0">
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
                      className={`cursor-pointer relative font-medium flex items-center gap-1 lg:gap-2 pb-2 lg:pb-3 text-xs lg:text-base transition-colors ${isActive
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
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

              <div className="flex items-center justify-end gap-2 lg:gap-3 lg:pb-3 mt-3">
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

            {/* Desktop table */}
            <div className="overflow-x-auto">
              <Table
                columns={getTabColumns()}
                data={getTabData()}
                rowsPerPage={10}
                showSearch={false}
                searchTerm={searchTerm}
                searchableFields={[
                  "service",
                  "date",
                  "serviceProvider",
                  "serviceStatus",
                ]}
                totalCount={serviceHistories?.totalCount || 0}
                onPageChange={setPage}
                currentPage={page}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceHistory;
