import { Controller } from "react-hook-form";
import { Wrench } from "lucide-react";
import CTA from "../../../../../components/CTA";
import FormInputField from "../../../../../components/FormInputField";
import SearchableSelect from "../../../../../components/SearchableSelect";
import { SERVICE_TYPES, SERVICES } from "../constants";
import { getBrandLogo } from "../../../../../utils/vehicleUtils";
import FormTextarea from "../../../../../components/FormTextArea";


export default function ServiceDetails({
  selectedVehicle,
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
  onBack,
  onClose,
}) {

  console.log(selectedVehicle);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ fontFamily: "body" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-900">Step 2: Enter Service Details</p>
          <p className="text-sm text-gray-500 mt-0.5">
            Log the service details to keep this vehicle's records accurate.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer ml-4"
        >
          ×
        </button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-[50px] h-[50px] rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={getBrandLogo(selectedVehicle?.make)}
            alt={selectedVehicle?.make}
            className="w-full h-full object-contain"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900">
            {`${selectedVehicle?.make} ${selectedVehicle?.vehicleModel} ${selectedVehicle?.yearOfManufacture}`}
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            {selectedVehicle?.plateNumber}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Controller
          name="serviceType"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              label="Service Type"
              options={SERVICE_TYPES}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type to search"
              error={errors.serviceType?.message}
            />
          )}
        />

        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              label="Service"
              options={SERVICES}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type to search"
              error={errors.service?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <FormInputField
          label="Service Date"
          type="date"
          placeholder="Select service date"
          error={errors.serviceDate?.message}
          {...register("serviceDate")}
        />

        <FormInputField
          label="Service Provider"
          placeholder="Enter service provider/technician name"
          error={errors.serviceProvider?.message}
          {...register("serviceProvider")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

        <FormInputField
          label="Service Provider Phone"
          placeholder="Enter service provider phone number"
          error={errors.serviceProviderPhone?.message}
          {...register("serviceProviderPhone")}
        />

        <FormInputField
          label="Cost (Optional)"
          placeholder="Enter service cost"
          error={errors.cost?.message}
          {...register("cost")}
        />
      </div>

      <FormTextarea
        label="Note"
        placeholder="Add details of your last service here..."
        error={errors.serviceNotes?.message}
        {...register("serviceNotes")}
      />

      <div className="flex gap-3 mt-6">
        <CTA name="← Back" variant="outline" color="blue" onClick={onBack} type="button" />
        <CTA
          name={isSubmitting ? "Submitting..." : "Submit"}
          color="blue"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}
