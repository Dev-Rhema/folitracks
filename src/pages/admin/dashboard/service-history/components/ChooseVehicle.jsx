import CTA from "../../../../../components/CTA";
import VehiclePicker from "./VehiclePicker";

export default function Step1ChooseVehicle({ vehicles, vehiclesLoading, selectedVehicle, onSelect, onNext, onClose, onLoadMore, hasMore, onSearch }) {

  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <div className="flex flex-col gap-1">
          <p className="text-gray-900 font-bold text-xl xl:text-2xl" style={{ fontFamily: "title" }}>Choose Customer Vehicle</p>
          <p className="text-gray-600 text-sm xl:text-base">Search for the customer vehicle using type or plate number.</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer ml-4"
        >
          ×
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        <VehiclePicker
          vehicles={vehicles}
          value={selectedVehicle?._id || selectedVehicle?.id}
          onChange={(id) => {
             const v = vehicles.find(item => (item._id || item.id) === id);
             if (v) onSelect(v);
          }}
          selectedVehicle={selectedVehicle}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          onSearch={onSearch}
          isLoading={vehiclesLoading}
        />
      </div>

      <div className="flex gap-3 mt-8">
        <CTA name="Cancel" variant="outline" color="blue" onClick={onClose} />
        <CTA
          name="Next"
          color="blue"
          onClick={onNext}
          disabled={!selectedVehicle || vehiclesLoading}
        />
      </div>
    </div>
  );
}
