import { useState, useMemo, useEffect } from "react";
import Table from "../../../../components/ui/Table";
import DashHeader from "../components/DashHeader";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../../../../components/ui/FilterDropdown";
import { getBrandLogo } from "../../../../utils/vehicleUtils";
import { useGetVehiclesQuery } from "../../../../redux/api/vehicleApiSlice";
import useGet from "../../../../hooks/useGet";
import EmptyState from "../../../../components/ui/EmptyState";
import TableActionMenu from "../../../../components/ui/TableActionMenu";
import Loader from "../../../../components/ui/Loader";

const VEHICLE_TYPE_OPTIONS = [
  "Toyota", "Lexus", "Mercedes-Benz", "BMW", "Hyundai", "Kia", "Ford", "Honda", "Nissan", "Audi", "Volkswagen"
];

function Vehicles({ onActionClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Reset applied search when search term is cleared (e.g. 'x' clicked in search input)
  useEffect(() => {
    if (searchTerm === "" && appliedSearch !== "") {
      setAppliedSearch("");
      setPage(1);
    }
  }, [searchTerm, appliedSearch]);
  

  const queryParams = useMemo(() => {
    const params = { page, limit: rowsPerPage };
    if (appliedSearch) params.search = appliedSearch;
    return params;
  }, [page, rowsPerPage, appliedSearch, filterValues]);

  const { data: vehiclesData, loading: vehiclesLoading } = useGet(useGetVehiclesQuery, queryParams);

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setPage(1);
  };

  const handleFilterChange = (category, value) => {
    setFilterValues((prev) => ({ ...prev, [category]: value }));
  };

  const columns = useMemo(() => [
    {
      key: "sn",
      label: "S/N",
      render: (_, index) => String((page - 1) * rowsPerPage + index + 1).padStart(2, "0")
    },
    {
      key: "vehicle",
      label: "Vehicle",
      render: (row) => {
        const logo = getBrandLogo(row.make);
        return (
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
              <img src={logo} alt={row.make} className="w-full h-full object-contain" />
            </div>
            <span>{`${row.make} ${row.vehicleModel} ${row.yearOfManufacture}`}</span>
          </div>
        );
      },
    },
    { key: "plateNumber", label: "Registration Number" },
    { key: "lastServiceDate", label: "Last Service Date", render: (row) => <span>{row.lastServiceDate?.split('T')[0]}</span> },
    { key: "nextServiceDate", label: "Next Service Date", render: (row) => <span>{row.nextServiceDate?.split('T')[0]}</span> },
    {
      key: "actions",
      label: "Action",
      className: "text-right",
      render: (row) => (
        <TableActionMenu
          row={row}
          actions={[
            {
              label: "View Details",
              onClick: (r) => onActionClick?.(r, "view"),
            },
            {
              label: "Edit Details",
              onClick: (r) => onActionClick?.(r, "edit"),
            },
            {
              label: "Remove",
              className: "text-red-500",
              onClick: (r) => onActionClick?.(r, "remove"),
            },
          ]}
        />
      ),
    },
  ], [onActionClick]);

  if (vehiclesLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col">
      <DashHeader title="Vehicles" />

      <div className="bg-white p-3 lg:p-4 rounded-2xl flex flex-col gap-4 lg:gap-6 border">
        <div className="flex justify-between items-center gap-2 lg:gap-3">

          <div className="flex items-center gap-2 lg:gap-3 ml-auto">
            <SearchBar
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
              className="w-48 xl:w-75"
            />

            <FilterDropdown
              categories={[{ label: "Vehicle Type", options: VEHICLE_TYPE_OPTIONS }]}
              values={filterValues}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* {filteredData.length === 0 ? ( */}
        {vehiclesData?.vehicles.length === 0 ? (
          <EmptyState
            title="No Vehicles Found"
            description={(appliedSearch || filterValues["Vehicle Type"]) ? "No vehicles match your search or filter criteria." : "You haven't added any vehicles to your account yet."}
            className="border-2 border-dashed border-gray-100 rounded-xl"
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={vehiclesData?.vehicles || []}
              rowsPerPage={rowsPerPage}
              showSearch={false}
              totalCount={vehiclesData?.totalCount || 0}
              currentPage={page}
              onPageChange={setPage}
              emptyState={
                <EmptyState
                  title="No Vehicles Found"
                  description={(appliedSearch || filterValues["Vehicle Type"]) ? "No vehicles match your search or filter criteria." : "You haven't added any vehicles to your account yet."}
                />
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Vehicles;
