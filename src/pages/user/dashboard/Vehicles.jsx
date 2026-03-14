import { useState, useMemo } from "react";
import Table from "../../../components/ui/Table";
import ServiceHistoryCard from "../../../components/ui/ServiceHistoryCard";
import DashHeader from "./components/DashHeader";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "../../../components/ui/FilterDropdown";
import { getBrandLogo } from "../../../utils/vehicleUtils";
import { useGetVehiclesQuery } from "../../../redux/api/vehicleApiSlice";
import useGet from "../../../hooks/useGet";
import EmptyState from "../../../components/ui/EmptyState";

const VEHICLE_TYPE_OPTIONS = [
  "Toyota", "Lexus", "Mercedes-Benz", "BMW", "Hyundai", "Kia", "Ford", "Honda", "Nissan", "Audi", "Volkswagen"
];


const COLUMNS = [
  { key: "sn", label: "S/N" },
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
  { key: "lastServiceDate", label: "Last Service Date" },
  { key: "nextServiceDate", label: "Next Service Date" },
];


function Vehicles({ removedRegistrations = [], onActionClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState({});

  const { data: vehiclesData, isLoading: vehiclesLoading } = useGet(useGetVehiclesQuery);

  const handleFilterChange = (category, value) => {
    setFilterValues((prev) => ({ ...prev, [category]: value }));
  };

  // Process data from API
  const processedData = useMemo(() => {
    const rawList = vehiclesData?.vehicles || [];
    return rawList
      .filter((v) => !removedRegistrations.includes(v.plateNumber))
      .map((v, i) => ({
        ...v,
        sn: String(i + 1).padStart(2, "0"),
        vehicleName: `${v.make} ${v.vehicleModel} ${v.yearOfManufacture}`,
        lastServiceDate: v.lastServiceDate || "—",
        nextServiceDate: v.nextServiceDate || "—",
      }));
  }, [vehiclesData, removedRegistrations]);

  const filteredData = useMemo(() => {
    return processedData.filter((v) => {
      const typeFilter = filterValues["Vehicle Type"];
      if (typeFilter && !v.make.toLowerCase().includes(typeFilter.toLowerCase())) return false;
      
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        return (
          v.vehicleName.toLowerCase().includes(s) ||
          v.plateNumber.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [processedData, filterValues, searchTerm]);

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
                className="w-48 xl:w-75"
            />
            <FilterDropdown
                categories={[{ label: "Vehicle Type", options: VEHICLE_TYPE_OPTIONS }]}
                values={filterValues}
                onChange={handleFilterChange}
            />
          </div>
        </div>

        {vehiclesLoading ? (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            </div>
        ) : filteredData.length === 0 ? (
          <EmptyState
            title="No Vehicles Found"
            description={searchTerm ? "No vehicles match your search criteria." : "You haven't added any vehicles to your account yet."}
            className="border-2 border-dashed border-gray-100 rounded-xl"
          />
        ) : (
            <>
                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                {filteredData.map((row, i) => (
                    <ServiceHistoryCard
                    key={i}
                    icon={getBrandLogo(row.make)}
                    iconBg="bg-black"
                    iconContain
                    title={row.vehicleName}
                    rows={[
                        { label: "Registration Number", value: row.plateNumber },
                        { label: "Last Service Date", value: row.lastServiceDate },
                        { label: "Next Service Date", value: row.nextServiceDate },
                    ]}
                    onViewDetails={() => onActionClick?.(row, "view")}
                    onEdit={() => onActionClick?.(row, "edit")}
                    onRemove={() => onActionClick?.(row, "remove")}
                    />
                ))}
                </div>

                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                <Table
                    columns={COLUMNS}
                    data={filteredData}
                    rowsPerPage={10}
                    showSearch={false}
                    onActionClick={onActionClick}
                    emptyState={
                      <EmptyState
                        title="No Vehicles Found"
                        description={searchTerm ? "No vehicles match your search criteria." : "You haven't added any vehicles to your account yet."}
                      />
                    }
                />
                </div>
            </>
        )}
      </div>
    </div>
  );
}

export default Vehicles;
