import { ChevronLeft } from "lucide-react";
import FileUploadField from "../../../../../components/FileUploadField";
import CTA from "../../../../../components/CTA";
import { StepHeader, PrivacyNotice } from "./Shared";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Ownership({
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
  const user = useSelector((state) => state.app.userInfo);
  const isIndividual = user?.accountType === "Individual Car Owner";

  const handleSubmitClick = async () => {
    const requiredUrls = isIndividual
      ? [files.vehicleRegistrationDocument, files.driverLicense]
      : [files.vehicleRegistrationDocument, files.businessLicense];

    if (!requiredUrls.every(Boolean)) {
      toast.error("Please upload all required documents and wait for them to finish.");
      return;
    }

    onShowConfirm();
  };

  return (
    <div>
      <StepHeader
        step={2}
        title="Upload Proof of Ownership"
        subtitle="Submit the required documents to confirm you're the rightful owner."
        onClose={onClose}
      />

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

        <CTA
          name={isRegistering ? "Submitting..." : "Add Vehicle"}
          color="blue"
          disabled={isRegistering || isUploading}
          onClick={handleSubmitClick}
        />
      </div>
    </div>
  );
}
