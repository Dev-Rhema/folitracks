import { getMakes, getModels } from "car-info";
import { ChevronLeft } from "lucide-react";
import CTA from "../../../../components/CTA";
import FormInputField from "../../../../components/FormInputField";
import SearchableSelect from "../../../../components/SearchableSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFullSchema } from "../../../../validation/vehicleSchema";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function VehicleRegistrationStage({ onContinue, onBack, defaultValues }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleFullSchema),
    mode: "all",
    defaultValues: {
      make: defaultValues?.make || "",
      vehicleModel: defaultValues?.vehicleModel || "",
      customVehicleModel: defaultValues?.customVehicleModel || "",
      yearOfManufacture: defaultValues?.yearOfManufacture || "",
      plateNumber: defaultValues?.plateNumber || "",
      vin: defaultValues?.vin || "",
    },
  });

  const VEHICLE_MAKES = getMakes().sort();
  const selectedMake = watch("make");
  const selectedModel = watch("vehicleModel");
  const isOtherModel = selectedModel === "Other";

  const availableModels = selectedMake
    ? [...getModels(selectedMake).sort(), "Other"]
    : [];

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    
    onContinue(data);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ fontFamily: "title" }}
        >
          Vehicle Registration
        </h1>
        <p
          className="text-center text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Provide your car details so we can build an accurate service profile for you.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          style={{ fontFamily: "body" }}
        >
          {/* Vehicle Make */}
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
                  // Reset model when make changes
                  setValue("vehicleModel", "", { shouldValidate: true });
                }}
                placeholder="Select vehicle make"
                error={errors.make?.message}
                required
              />
            )}
          />

          {/* Vehicle Model */}
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

          {/* Year of Manufacture */}
          <FormInputField
            label="Year of Manufacture"
            name="yearOfManufacture"
            type="text"
            placeholder="2017"
            error={errors.yearOfManufacture?.message}
            {...register("yearOfManufacture")}
          />

          {/* Vehicle Plate Number */}
          <FormInputField
            label="Vehicle Plate Number"
            name="plateNumber"
            type="text"
            placeholder="Enter Vehicle Plate Number"
            error={errors.plateNumber?.message}
            {...register("plateNumber")}
          />

          {/* VIN (optional) */}
          <FormInputField
            label="VIN"
            name="vin"
            type="text"
            placeholder="Enter Vehicle Identification Number"
            error={errors.vin?.message}
            {...register("vin")}
          />

          {/* Continue Button */}
          <div className="pt-4">
            <CTA name="Continue" color="blue" className="w-full" type="submit" />
          </div>
        </form>

        {/* <button
          onClick={() => onBack(getValues())}
          className="mt-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft size={20} /> Back
        </button> */}
      </div>
    </div>
  );
}

