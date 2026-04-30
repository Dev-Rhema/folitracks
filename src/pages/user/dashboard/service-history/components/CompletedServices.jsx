import React, { useEffect } from "react";
import Table from "../../../../../components/ui/Table";
import TableActionMenu from "../../../../../components/ui/TableActionMenu";
import {
  COMPLETED_VEHICLE_MAKES,
  SERVICE_TYPE_ACCORDION,
  REPAIR_SERVICES,
  ROUTINE_SERVICES
} from "../constants";
import { renderServiceCell, renderVehicleCell } from "../serviceHistoryUtils";
import useGet from "../../../../../hooks/useGet";
import { useGetServiceHistoryQuery } from "../../../../../redux/api/serviceHistoryApiSlice";
import Loader from "../../../../../components/ui/Loader";

const COMPLETED_FILTER_CATEGORIES = [
  SERVICE_TYPE_ACCORDION,
  { label: "Vehicle Make", type: "list", options: COMPLETED_VEHICLE_MAKES },
  { label: "Date Range", type: "calendar" },
  { label: "Price Range", type: "priceRange" },
];

const COMPLETED_COLUMNS = [
  { key: "sn", label: "S/N", render: (_, index) => index + 1 },
  { key: "service", label: "Service", render: renderServiceCell },
  { key: "vehicle", label: "Vehicle", render: renderVehicleCell },
  { key: "date", label: "Date", render: (row) => row?.vehicle?.nextServiceDate?.split("T")[0] },
  { key: "cost", label: "Cost" },
  { key: "serviceProvider", label: "Service Provider" },
];

export default function CompletedServices({
  page,
  setPage,
  searchTerm,
  handleActionClick,
  filterValues,
  onCountUpdate
}) {
  const { data: serviceHistories, loading } = useGet(useGetServiceHistoryQuery, {
    page,
    status: ["Completed"],
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

    // Server already handles status and search, but we check filters locally if needed
    // or we could pass filters to the API. For now, following the pattern.

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

    const dateFilter = filterValues["Date Range"];
    if (dateFilter?.start) {
      filteredData = filteredData.filter((row) => {
        const rawDate = row.date || "";
        const [d, m, y] = rawDate.split("/");
        const iso = `${y}-${m}-${d}`;
        if (dateFilter.end) return iso >= dateFilter.start && iso <= dateFilter.end;
        return iso === dateFilter.start;
      });
    }

    const priceFilter = filterValues["Price Range"];
    if (priceFilter) {
      filteredData = filteredData.filter((row) => {
        const cost = parseInt(row.cost?.replace(/[₦,]/g, "") || "0", 10);
        return cost >= priceFilter.min && cost <= priceFilter.max;
      });
    }

    return filteredData;
  };

  const columnsWithActions = [
    ...COMPLETED_COLUMNS,
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
      totalCount={totalCount}
      onPageChange={setPage}
      currentPage={page}
    />
  );
}

export { COMPLETED_FILTER_CATEGORIES };
