import { useState } from "react";
import Table from "../ui/Table";
import ServiceHistoryCard from "../ui/ServiceHistoryCard";
import DashHeader from "./DashHeader";
import SearchBar from "./SearchBar";
import { Filter } from "lucide-react";
import { getBrandLogo } from "../../utils/vehicleUtils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BASE_VEHICLES = [
  { vehicle: "Lexus is250 2008", reg: "LGS-142673" },
  { vehicle: "Toyota Camry 2010", reg: "LGS-238491" },
  { vehicle: "Ford Explorer 2019", reg: "LGS-374820" },
  { vehicle: "Mercedes Benz C300 2010", reg: "LGS-491037" },
  { vehicle: "BMW 320i 2017", reg: "LGS-512864" },
  { vehicle: "Hyundai Sonata 2010", reg: "LGS-628193" },
  { vehicle: "Hyundai Elantra 2018", reg: "LGS-734056" },
  { vehicle: "Kia Sportage 2020", reg: "LGS-845729" },
  { vehicle: "Lexus RX350 2015", reg: "LGS-951348" },
  { vehicle: "BMW X5 2020", reg: "LGS-067215" },
  { vehicle: "Toyota Corolla 2016", reg: "LGS-173842" },
  { vehicle: "Ford F-150 2018", reg: "LGS-289461" },
  { vehicle: "Mercedes Benz GLE 2021", reg: "LGS-395078" },
  { vehicle: "Kia Sorento 2019", reg: "LGS-401937" },
  { vehicle: "BMW X3 2015", reg: "LGS-517264" },
  { vehicle: "Hyundai Tucson 2017", reg: "LGS-623891" },
  { vehicle: "Lexus ES300 2014", reg: "LGS-739408" },
  { vehicle: "Toyota Highlander 2020", reg: "LGS-845127" },
  { vehicle: "Ford Escape 2016", reg: "LGS-951740" },
  { vehicle: "Mercedes Benz GLA 2022", reg: "LGS-067853" },
];

const VEHICLES_DATA = Array.from({ length: 12 }, (_, i) => {
  const base = BASE_VEHICLES[i % BASE_VEHICLES.length];
  return {
    sn: String(i + 1).padStart(2, "0"),
    vehicle: base.vehicle,
    registrationNumber: base.reg,
    lastServiceDate: "15/06/2025",
    nextServiceDate: "15/09/2025",
  };
});

// ─── Columns ──────────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: "sn", label: "S/N" },
  {
    key: "vehicle",
    label: "Vehicle",
    render: (row) => {
      const logo = getBrandLogo(row.vehicle);
      return (
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
            <img src={logo} alt={row.vehicle} className="w-full h-full object-contain" />
          </div>
          <span>{row.vehicle}</span>
        </div>
      );
    },
  },
  { key: "registrationNumber", label: "Registration Number" },
  { key: "lastServiceDate", label: "Last Service Date" },
  { key: "nextServiceDate", label: "Next Service Date" },
];

// ─── Component ────────────────────────────────────────────────────────────────

function Vehicles({ extraVehicles = [], removedRegistrations = [], onActionClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const displayData = [...extraVehicles, ...VEHICLES_DATA]
    .filter((v) => !removedRegistrations.includes(v.registrationNumber))
    .map((v, i) => ({ ...v, sn: String(i + 1).padStart(2, "0") }));

  const mobileFiltered = displayData.filter((v) => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return v.vehicle.toLowerCase().includes(s) || v.registrationNumber.toLowerCase().includes(s);
  });

  return (
    <div className="flex flex-col">
      <DashHeader title="Vehicles" />

      <div className="bg-white p-3 lg:p-4 rounded-2xl flex flex-col gap-4 lg:gap-6 border">
        <div className="flex justify-end items-center gap-2 lg:gap-3">
          <SearchBar
            placeholder="Search vehicle by make, year, reg.no....."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 lg:w-52"
          />
          <button className="px-3 lg:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 lg:gap-2 text-sm text-gray-600 font-medium cursor-pointer">
            <Filter size={14} />
            Filter
          </button>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {mobileFiltered.map((row, i) => (
            <ServiceHistoryCard
              key={i}
              icon={getBrandLogo(row.vehicle)}
              iconBg="bg-black"
              iconContain
              title={row.vehicle}
              rows={[
                { label: "Registration Number", value: row.registrationNumber },
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
            data={displayData}
            rowsPerPage={10}
            showSearch={false}
            searchTerm={searchTerm}
            searchableFields={["vehicle", "registrationNumber", "lastServiceDate", "nextServiceDate"]}
            onActionClick={onActionClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Vehicles;
