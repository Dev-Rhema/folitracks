import { useState } from "react";
import { Lock } from "lucide-react";
import CTA from "../../../../components/CTA";
import FileUploadField from "../../../../components/FileUploadField";
import FormInputField from "../../../../components/FormInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFullSchema } from "../../../../validation/vehicleSchema";
import { useRegisterVehicleMutation } from "../../../../redux/api/vehicleApiSlice";
import { useUploadDocumentMutation } from "../../../../redux/api/documentApiSlice";
import usePost from "../../../../hooks/usePost";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";

export default function VehicleOwnershipStage({
  onContinue,
  onBack,
  vehicleData,
  defaultValues,
}) {
  const { postData: registerVehicle, isLoading: isRegistering } = usePost(useRegisterVehicleMutation);
  const { postData: uploadDocument, isLoading: isUploading } = usePost(useUploadDocumentMutation);

  const user = useSelector((state) => state.app.userInfo);
  const isIndividual = user?.accountType === "Individual Car Owner";

  const [files, setFiles] = useState({
    vehicleRegistrationDocument: defaultValues?.files?.vehicleRegistrationDocument || null,
    driverLicense: defaultValues?.files?.driverLicense || null,
    businessLicense: defaultValues?.files?.businessLicense || null,
  });

  const [uploadedUrls, setUploadedUrls] = useState({
    vehicleRegistrationDocument: defaultValues?.uploadedUrls?.vehicleRegistrationDocument || null,
    driverLicense: defaultValues?.uploadedUrls?.driverLicense || null,
    businessLicense: defaultValues?.uploadedUrls?.businessLicense || null,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleFileChange = async (e, fileKey) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fileKey]: file }));

      try {
        const formData = new FormData();
        formData.append("files", file);

        const response = await uploadDocument(formData, "Document uploaded successfully!");
        if (response) {
          const url = response?.data?.[0]
          setUploadedUrls((prev) => ({ ...prev, [fileKey]: url }));
        }
      } catch (error) {
        console.error("Upload error:", error);
        setFiles((prev) => ({ ...prev, [fileKey]: null }));
        setUploadedUrls((prev) => ({ ...prev, [fileKey]: null }));
      }
    }
  };

  const onSubmit = async (data) => {
    const requiredUrls = isIndividual
      ? [uploadedUrls.vehicleRegistrationDocument, uploadedUrls.driverLicense]
      : [uploadedUrls.vehicleRegistrationDocument, uploadedUrls.businessLicense];

    console.log("Required URLs:", requiredUrls);

    if (!requiredUrls.every(Boolean)) {
      toast.error("Please upload all required documents and wait for them to finish.");
      return;
    }

    try {
      const payload = {
        make: vehicleData?.make || "",
        vehicleModel: vehicleData?.vehicleModel || "",
        yearOfManufacture: vehicleData?.yearOfManufacture || "",
        plateNumber: vehicleData?.plateNumber || "",
        vin: vehicleData?.vin || "",
        accountType: user?.accountType,
        fullName: user.fullname || "",
        businessName: user.fullname || "",
        // businessName: user.businessName || "",
        vehicleRegistrationDocument: uploadedUrls.vehicleRegistrationDocument,
        driverLicense: uploadedUrls.driverLicense,
        ...(isIndividual ? {} : { businessLicense: uploadedUrls.businessLicense })
      };

      const response = await registerVehicle(
        payload,
        "Vehicle registered successfully!"
      );
      if (response) {
        onContinue(response);
      }
    } catch (error) {
      console.error("Error during vehicle registration:", error);
      const errorMsg = error?.data?.message || error?.message || "Failed to register vehicle. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ fontFamily: "title" }}
        >
          Confirm Vehicle Ownership
        </h1>
        <p
          className="text-center text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Provide the required documents to prove you are the rightful owner or
          authorized dealer of this vehicle.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          style={{ fontFamily: "body" }}
        >
          <>
            <FileUploadField
              label="Vehicle Registration Document"
              fieldId="regDoc"
              fileName={files.vehicleRegistrationDocument}
              onFileChange={(e) => handleFileChange(e, "vehicleRegistrationDocument")}
            />

            <FileUploadField
              label="Driver's License"
              fieldId="driverLic"
              fileName={files.driverLicense}
              onFileChange={(e) => handleFileChange(e, "driverLicense")}
            />
          </>

          {/* Business Documents */}
          {!isIndividual && (
            <div>
              <FileUploadField
                label="Business License / Registration Certificate"
                fieldId="busLic"
                fileName={files.businessLicense}
                onFileChange={(e) => handleFileChange(e, "businessLicense")}
              />
              <p className="text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "title" }}>
                Must match Business License / Registration Certificate
              </p>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-xs sm:text-sm text-blue-800 flex gap-2">
              <Lock size={20} className="flex-shrink-0 mt-0.5" />
              <span>
                Your privacy is important to us. The documents you upload are only
                used to confirm your vehicle details and ownership. We do not
                share your information with third parties. All data is securely
                stored and protected.
              </span>
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <CTA
              name="Continue"
              color="blue"
              className="w-full"
              isLoading={isRegistering || isUploading}
            />
          </div>
        </form>

        <button
          onClick={() => onBack({ ...getValues(), files, uploadedUrls })}
          className="mt-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft size={20} /> Back
        </button>
      </div>
    </div>
  );
}
