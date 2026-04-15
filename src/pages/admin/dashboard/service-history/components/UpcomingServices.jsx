import React from "react";
import Table from "../../../../../components/ui/Table";
import TableActionMenu from "../../../../../components/ui/TableActionMenu";
import StatusBadge from "../../../../../components/ui/StatusBadge";
import { 
  UPCOMING_OVERDUE_VEHICLE_MAKES, 
  UPCOMING_STATUSES,
  SERVICE_TYPE_ACCORDION,
  REPAIR_SERVICES,
  ROUTINE_SERVICES 
} from "../constants";
import { renderServiceCell, renderVehicleCell, renderOwnerCell } from "../serviceHistoryUtils";

const UPCOMING_FILTER_CATEGORIES = [
  SERVICE_TYPE_ACCORDION,
  { label: "Vehicle Make", type: "list", options: UPCOMING_OVERDUE_VEHICLE_MAKES },
  { label: "Status", type: "list", options: UPCOMING_STATUSES },
  { label: "Date Range", type: "calendar" },
];

const UPCOMING_COLUMNS = [
  { key: "sn", label: "S/N", render: (_, index) => index + 1 },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "owner", label: "Owner", render: renderOwnerCell },
  {
    key: "nextServiceDate",
    label: "Next Service Date",
    render: (row) => (
      <div className="font-medium text-gray-800 text-sm">
        {row?.vehicle?.nextServiceDate?.split("T")[0] || "N/A"}
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.serviceStatus} />,
  },
];

export default function UpcomingServices({ 
  data, 
  page, 
  setPage, 
  totalCount, 
  searchTerm, 
  handleActionClick,
  handleStatusChange,
  onEditLog,
  filterValues 
}) {
  
  const getFilteredData = () => {
    let filteredData = [...data];
    
    // Service Type filter
    const svcFilter = filterValues["Service Type"];
    if (svcFilter) {
      if (svcFilter.service) {
        filteredData = filteredData.filter((row) => row.service === svcFilter.service);
      } else if (svcFilter.group === "Repairs") {
        filteredData = filteredData.filter((row) => REPAIR_SERVICES.includes(row.service));
      } else if (svcFilter.group === "Routine Service") {
        filteredData = filteredData.filter((row) => ROUTINE_SERVICES.includes(row.service));
      }
    }

    // Vehicle Make filter
    const makeFilter = filterValues["Vehicle Make"];
    if (makeFilter) {
      filteredData = filteredData.filter((row) =>
        (row.vehicle?.make || "").toLowerCase().includes(makeFilter.toLowerCase())
      );
    }

    // Status filter
    const statusFilter = filterValues["Status"];
    if (statusFilter) {
      filteredData = filteredData.filter((row) => row.serviceStatus === statusFilter);
    }

    // Date Range filter
    const dateFilter = filterValues["Date Range"];
    if (dateFilter?.start) {
      filteredData = filteredData.filter((row) => {
        const rawDate = row.date || row.nextServiceDate || "";
        const [d, m, y] = rawDate?.split("/");
        const iso = `${y}-${m}-${d}`;
        if (dateFilter.end) return iso >= dateFilter.start && iso <= dateFilter.end;
        return iso === dateFilter.start;
      });
    }

    return filteredData;
  };

  const columnsWithActions = [
    ...UPCOMING_COLUMNS,
    {
      key: "actions",
      label: "Action",
      className: "text-right",
      render: (row) => (
        <TableActionMenu
          actions={[
            {
              label: "View Details",
              onClick: (r) => handleActionClick(r, "view"),
            },
            {
              label: "Reschedule",
              onClick: (r) => handleActionClick(r, "reschedule"),
            },
            // {
            //   label: "Edit Details",
            //   onClick: (r) => onEditLog(r),
            // },
            {
              label: "Change Status",
              subActions: [
                {
                  label: "Start Service",
                  onClick: (r) => handleStatusChange(r._id, "In Progress"),
                },
                {
                  label: "Complete Service",
                  onClick: (r) => handleStatusChange(r._id, "Completed"),
                },
              ],
            },
          ]}
          row={row}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columnsWithActions}
      data={getFilteredData()}
      rowsPerPage={10}
      showSearch={false}
      searchTerm={searchTerm}
      searchableFields={["service", "serviceStatus"]}
      totalCount={totalCount}
      onPageChange={setPage}
      currentPage={page}
    />
  );
}

export { UPCOMING_FILTER_CATEGORIES };
