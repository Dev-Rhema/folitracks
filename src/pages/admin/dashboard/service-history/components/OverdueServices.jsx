import React from "react";
import Table from "../../../../../components/ui/Table";
import TableActionMenu from "../../../../../components/ui/TableActionMenu";
import StatusBadge from "../../../../../components/ui/StatusBadge";
import { 
  UPCOMING_OVERDUE_VEHICLE_MAKES, 
  SERVICE_TYPE_ACCORDION,
  REPAIR_SERVICES,
  ROUTINE_SERVICES 
} from "../constants";
import { renderServiceCell, renderVehicleCell } from "../serviceHistoryUtils";

const OVERDUE_FILTER_CATEGORIES = [
  SERVICE_TYPE_ACCORDION,
  { label: "Vehicle Make", type: "list", options: UPCOMING_OVERDUE_VEHICLE_MAKES },
  { label: "Date Range", type: "calendar" },
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

export default function OverdueServices({ 
  data, 
  page, 
  setPage, 
  totalCount, 
  searchTerm, 
  handleActionClick,
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

    // Date Range filter
    const dateFilter = filterValues["Date Range"];
    if (dateFilter?.start) {
      filteredData = filteredData.filter((row) => {
        const rawDate = row.date || row.lastServiceDate || "";
        const [d, m, y] = rawDate?.split("/");
        const iso = `${y}-${m}-${d}`;
        if (dateFilter.end) return iso >= dateFilter.start && iso <= dateFilter.end;
        return iso === dateFilter.start;
      });
    }

    return filteredData;
  };

  const columnsWithActions = [
    ...OVERDUE_COLUMNS,
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
      searchableFields={["service", "date"]}
      totalCount={totalCount}
      onPageChange={setPage}
      currentPage={page}
    />
  );
}

export { OVERDUE_FILTER_CATEGORIES };
