import { ChevronLeft } from "lucide-react";
import CTA from "../CTA";
import FormInputField from "./FormInputField";
import SearchableSelect from "./SearchableSelect";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "../../validation/authSchema";
import { useSelector } from "react-redux";

const VEHICLE_MAKES = [
  "Toyota", "Lexus", "Mercedes-Benz", "Ford",
  "BMW", "Hyundai", "KIA", "Other",
];

const VEHICLE_MODELS = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander"],
  Lexus: ["RX", "ES", "GX", "LX"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape"],
  BMW: ["3 Series", "5 Series", "7 Series", "X5"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
  KIA: ["Forte", "Optima", "Sportage", "Sorento"],
  Other: ["Other Model"],
};

export default function VehicleRegistrationStage({ onContinue, onBack, defaultValues }) {

  const userInfo = useSelector(state => state.app.userInfo);

  console.log("User Info:", userInfo);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    mode: "all",
    defaultValues: {
      make: defaultValues?.make || "",
      vehicleModel: defaultValues?.vehicleModel || "",
      yearOfManufacture: defaultValues?.yearOfManufacture || "",
      plateNumber: defaultValues?.plateNumber || "",
      vin: defaultValues?.vin || "",
    },
  });

  const selectedMake = watch("make");
  const availableModels = VEHICLE_MODELS[selectedMake] || [];

  console.log("Errors:", errors);

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
                onChange={field.onChange}
                placeholder={selectedMake ? "Select vehicle model" : "Select a make first"}
                disabled={!selectedMake}
                error={errors.vehicleModel?.message}
                required
              />
            )}
          />

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
              <CTA name="Continue" color="blue" className="w-full"  type="submit"/>
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

