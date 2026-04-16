import React, { useEffect } from "react";
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
import { renderServiceCell, renderVehicleCell } from "../serviceHistoryUtils";
import useGet from "../../../../../hooks/useGet";
import { useGetServiceHistoryQuery } from "../../../../../redux/api/serviceHistoryApiSlice";
import Loader from "../../../../../components/ui/Loader";

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
  {
    key: "serviceDate",
    label: "Last Service Date",
    render: (row) => (
      <div className="font-medium text-gray-800 text-sm">
        {row.serviceDate?.split('T')[0] || "N/A"}
      </div>
    ),
  },
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

export default function UpcomingServices({ 
  page, 
  setPage, 
  searchTerm, 
  handleActionClick, 
  filterValues,
  onCountUpdate
}) {
  const { data: serviceHistories, loading } = useGet(useGetServiceHistoryQuery, { 
    page, 
    status: "In Progress",
    // status: "Scheduled",
    search: searchTerm
  });

  const data = serviceHistories?.serviceHistory || [];
  const totalCount = serviceHistories?.totalCount || 0;

  useEffect(() => {
    if (!loading && serviceHistories) {
      onCountUpdate?.(totalCount);
    }
  }, [totalCount, loading, serviceHistories]);

  if (loading) return <Loader />;

  const getFilteredData = () => {
    let filteredData = [...data];
    
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

    const makeFilter = filterValues["Vehicle Make"];
    if (makeFilter) {
      filteredData = filteredData.filter((row) =>
        (row.vehicle?.make || "").toLowerCase().includes(makeFilter.toLowerCase())
      );
    }

    const statusFilter = filterValues["Status"];
    if (statusFilter) {
      filteredData = filteredData.filter((row) => row.serviceStatus === statusFilter);
    }

    const dateFilter = filterValues["Date Range"];
    if (dateFilter?.start) {
      filteredData = filteredData.filter((row) => {
        const rawDate = row.nextServiceDate || "";
        const [d, m, y] = rawDate.split("/");
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
            {
              label: "Set Reminder",
              onClick: (r) => handleActionClick(r, "set_reminder"),
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
