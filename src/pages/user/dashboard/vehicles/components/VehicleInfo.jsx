import { Controller } from "react-hook-form";
import SearchableSelect from "../../../../../components/SearchableSelect";
import CTA from "../../../../../components/CTA";
import { VehicleInput, StepHeader } from "./Shared";
import { getMakes, getModels } from "car-info";
import FormInputField from "../../../../../components/FormInputField";


export default function VehicleInfo({ register, control, errors, watch, setValue, onNext, onClose }) {
  const VEHICLE_MAKES = getMakes().sort();
  const selectedMake = watch("make");
  const selectedModel = watch("vehicleModel");
  const isOtherModel = selectedModel === "Other";

  const availableModels = selectedMake
    ? [...getModels(selectedMake).sort(), "Other"]
    : [];

  return (
    <div>
      <StepHeader
        step={1}
        title="Add Your Vehicle"
        subtitle="Enter the basic information about your car so we can register it to your account."
        onClose={onClose}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Controller
          name="make"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              label="Vehicle Make"
              options={VEHICLE_MAKES}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                setValue("vehicleModel", "", { shouldValidate: true });
              }}
              placeholder="Type to search"
              error={errors.make?.message}
            />
          )}
        />

        <Controller
          name="vehicleModel"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              label="Vehicle Model"
              options={availableModels}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                // Clear the custom text when switching away from Other
                if (val !== "Other") return;
              }}
              placeholder={selectedMake ? "Select vehicle model" : "Select a make first"}
              disabled={!selectedMake}
              error={!isOtherModel ? errors.vehicleModel?.message : undefined}
              required
            />
          )}
        />

      {isOtherModel && (
        <FormInputField
          label="Enter your model name"
          name="customVehicleModel"
          type="text"
          placeholder="e.g. Prado, Land Cruiser 200…"
          {...register("customVehicleModel")}
          required
        />
      )}
       
        <VehicleInput
          label="Year of Manufacture"
          placeholder="2017"
          {...register("yearOfManufacture")}
          error={errors.yearOfManufacture?.message}
        />

        <VehicleInput
          label="Vehicle Plate Number"
          placeholder="Enter Vehicle Plate Number"
          {...register("plateNumber")}
          error={errors.plateNumber?.message}
        />
       
        <VehicleInput
          label="VIN"
          placeholder="Enter Vehicle Identification Number"
          {...register("vin")}
          error={errors.vin?.message}
        />
      </div>

      <div className="flex gap-3 mt-10">
        <CTA name="Cancel" variant="outline" color="blue" onClick={onClose} />
        <CTA name="Next" color="blue" onClick={onNext} />
      </div>
    </div>
  );
}
