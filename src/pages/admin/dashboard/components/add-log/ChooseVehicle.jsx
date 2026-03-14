import CTA from "../../../../../components/CTA";
import VehiclePicker from "./VehiclePicker";

export default function Step1ChooseVehicle({ vehicles, vehiclesLoading, selectedVehicleId, onSelect, onNext, onClose }) {
  return (
    <div>
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="font-semibold text-gray-900">Step 1: Choose the Vehicle</p>
          <p className="text-sm text-gray-500 mt-0.5">
            Find this vehicle to link it to a service record correctly.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer ml-4"
        >
          ×
        </button>
      </div>

      <div className="mt-5">
        <VehiclePicker
          vehicles={vehicles}
          value={selectedVehicleId}
          onChange={onSelect}
        />
      </div>

      <div className="flex gap-3 mt-8">
        <CTA name="Cancel" variant="outline" color="blue" onClick={onClose} />
        <CTA
          name="Next"
          color="blue"
          onClick={onNext}
          disabled={!selectedVehicleId || vehiclesLoading}
        />
      </div>
    </div>
  );
}
