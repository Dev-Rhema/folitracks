import { Controller } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import SearchableSelect from "../../../../../components/SearchableSelect";
import FileUploadField from "../../../../../components/FileUploadField";
import CTA from "../../../../../components/CTA";
import { VehicleInput, StepHeader, PrivacyNotice } from "./Shared";
import { VEHICLE_MAKES, VEHICLE_MODELS } from "../constants";

export default function VehicleInfo({ register, control, errors, watch, setValue, onNext, onClose }) {
  const selectedMake = watch("make");

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
              options={VEHICLE_MODELS[selectedMake] || []}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type to search"
              disabled={!selectedMake}
              error={errors.vehicleModel?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
      </div>

      <div className="mb-6">
        <VehicleInput
          label="VIN"
          placeholder="Enter Vehicle Identification Number"
          {...register("vin")}
          error={errors.vin?.message}
        />
      </div>

      <div className="flex gap-3">
        <CTA name="Cancel" variant="outline" color="blue" onClick={onClose} />
        <CTA name="Next" color="blue" onClick={onNext} />
      </div>
    </div>
  );
}
