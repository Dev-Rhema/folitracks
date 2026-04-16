import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "../../../../../utils/utils"
import Loader from "../../../../../components/ui/Loader";

export default function VehiclePicker({ vehicles = [], value, onChange, onLoadMore, hasMore, isLoading, onSearch, selectedVehicle }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  console.log(selectedVehicle);
  console.log(value);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(query);
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [query]);

  // fetch more after they view last 5 items and there's more data in the api
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5) {
      if (!isLoading && hasMore) {
        onLoadMore?.();
      }
    }
  };

  const selected = value
    ? (vehicles.find((v) => (v._id || v.id) === value) || selectedVehicle)
    : (selectedVehicle || null);


  return (
    <div className="relative w-full" style={{ fontFamily: "body" }}>
      <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "title" }}>
        Vehicle
      </label>

      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center border-gray-200 max-w-[480px] justify-between px-4 py-3 text-left bg-[#f1f5fb] border rounded transition-colors duration-150
          ${!selected ? "text-gray-400" : "text-gray-900"}
          cursor-pointer hover:border-blue-400`}
      >
        {selected ? (
          <div>
            <span className="font-medium text-gray-900">
              {selected.make} {selected.vehicleModel} {selected.yearOfManufacture}
            </span>
            <span className="ml-3 text-sm text-gray-400">{selected.plateNumber + " | " + selected.fullName}</span>
          </div>
        ) : (
          <span>Search by vehicle type, plate number, customer name</span>
        )}
        <svg
          className={`w-4 h-4 text-gray-500 shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-w-[480px]">
          <div className="p-2 border-b border-gray-100 flex items-center gap-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-3 py-2 text-sm bg-[#f1f5fb] border border-gray-200 rounded focus:outline-none"
            />
          </div>

          <ul
            onScroll={handleScroll}
            className="max-h-60 overflow-y-auto divide-y divide-gray-100"
          >
            {vehicles.length > 0 ? (
              vehicles.map((v) => {
                const vid = v._id || v.id;
                return (
                  <li
                    key={vid}
                    onMouseDown={() => {
                      onChange(vid);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${value === vid ? "bg-blue-50" : ""}`}
                  >
                    <div className="font-medium text-sm text-gray-900">
                      {v.make} {v.vehicleModel} {v.yearOfManufacture}
                    </div>
                    <div className="flex gap-3 mt-0.5">
                      <span className="text-sm text-gray-400">{v.plateNumber + " | " + capitalizeFirstLetter(v.fullName)}</span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No vehicles found</li>
            )}

            {isLoading && (
              <div className="py-4">
                <Loader size="small" />
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

