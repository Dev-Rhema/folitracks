import { ChevronLeft } from "lucide-react";
import FileUploadField from "../../../../../components/FileUploadField";
import CTA from "../../../../../components/CTA";
import { VehicleInput, StepHeader, PrivacyNotice } from "./Shared";

export default function Ownership({
  register,
  watch,
  trigger,
  errors,
  files,
  loadingFiles,
  onFileChange,
  onBack,
  onShowConfirm,
  isRegistering,
  isUploading,
  onClose,
}) {
  const accountType = watch("accountType");
  const isIndividual = accountType === "individual";

  const handleSubmitClick = async () => {
    const fields = ["accountType", isIndividual ? "fullName" : "businessName"];
    const isValid = await trigger(fields);
    if (isValid) onShowConfirm();
  };

  return (
    <div>
      <StepHeader
        step={2}
        title="Upload Proof of Ownership"
        subtitle="Submit the required documents to confirm you're the rightful owner."
        onClose={onClose}
      />

      {/* Account Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
        <select
          {...register("accountType")}
          className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="individual">Individual Car Owner</option>
          <option value="business">Automobile Related Business</option>
        </select>
      </div>

      {/* Name field */}
      {isIndividual ? (
        <VehicleInput
          label="Full Name"
          placeholder="Obafemi Olusuntimilehin"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
      ) : (
        <VehicleInput
          label="Business Name"
          placeholder="Acme Auto Ltd."
          {...register("businessName")}
          error={errors.businessName?.message}
        />
      )}

      {/* Document uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <FileUploadField
            label="Vehicle Registration Document"
            fieldId="regDoc"
            fileName={files.vehicleRegistrationDocument}
            onFileChange={(e) => onFileChange(e, "vehicleRegistrationDocument")}
            isLoading={loadingFiles.vehicleRegistrationDocument}
          />
          {errors.vehicleRegistrationDocument && (
            <p className="text-xs text-red-500 -mt-4 mb-4">{errors.vehicleRegistrationDocument.message}</p>
          )}
        </div>

        <div>
          <FileUploadField
            label="Driver's License"
            fieldId="driversLicense"
            fileName={files.driverLicense}
            onFileChange={(e) => onFileChange(e, "driverLicense")}
            isLoading={loadingFiles.driverLicense}
          />
        </div>

        {!isIndividual && (
          <div>
            <FileUploadField
              label="Business License"
              fieldId="businessLicense"
              fileName={files.businessLicense}
              onFileChange={(e) => onFileChange(e, "businessLicense")}
              isLoading={loadingFiles.businessLicense}
            />
          </div>
        )}
      </div>

      <PrivacyNotice />

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-6 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <button type="button" onClick={handleSubmitClick}>
          <CTA
            name={isRegistering ? "Submitting..." : "Add Vehicle"}
            color="blue"
            disabled={isRegistering || isUploading}
          />
        </button>
      </div>
    </div>
  );
}
