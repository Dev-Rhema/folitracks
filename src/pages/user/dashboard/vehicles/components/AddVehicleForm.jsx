import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { vehicleFullSchema } from "../../../../../validation/vehicleSchema";
import { useGetVehiclesQuery, useRegisterVehicleMutation } from "../../../../../redux/api/vehicleApiSlice";
import { useUploadDocumentMutation } from "../../../../../redux/api/documentApiSlice";
import { useGetUserQRQuery } from "../../../../../redux/api/authApiSlice";
import usePost from "../../../../../hooks/usePost";
import ConfirmAddVehicle from "./ConfirmAddVehicleModal";
import VehicleInfo from "./VehicleInfo";
import Ownership from "./Ownership";
import QR from "./QR";



export default function AddVehicleForm({ onClose }) {
  const [step, setStep] = useState(1);

  const { postData: registerVehicle, isLoading: isRegistering } = usePost(useRegisterVehicleMutation);
  const { postData: uploadDocument, isLoading: isUploading } = usePost(useUploadDocumentMutation);
  const { data: userQrData, isLoading: isUserQrLoading, refetch: refetchQr } = useGetUserQRQuery(undefined, {
    skip: step !== 4,
  });
  const { data: vehiclesData, refetch: refetchVehicles } = useGetVehiclesQuery();

  const [loadingFiles, setLoadingFiles] = useState({
    vehicleRegistrationDocument: false,
    driverLicense: false,
    businessLicense: false,
  });

  const [files, setFiles] = useState({
    vehicleRegistrationDocument: null,
    driverLicense: null,
    businessLicense: null,
  });

  const [uploadedUrls, setUploadedUrls] = useState({
    vehicleRegistrationDocument: null,
    driverLicense: null,
    businessLicense: null,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { register, handleSubmit, control, watch, setValue, trigger, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(vehicleFullSchema),
    mode: "all",
    defaultValues: {
      make: "", vehicleModel: "", yearOfManufacture: "",
      plateNumber: "", vin: "", accountType: "",
    },
  });

  let user = useSelector((state) => state.app.userInfo);
  user = user?.user || user?.authResponse

  const isIndividual = user?.accountType === "Individual Car Owner";

  const handleFileChange = async (e, fileKey) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({ ...prev, [fileKey]: file }));
    setLoadingFiles((prev) => ({ ...prev, [fileKey]: true }));

    try {
      const formData = new FormData();
      formData.append("files", file);
      const response = await uploadDocument(formData, "Document uploaded successfully!");
      if (response) {
        setUploadedUrls((prev) => ({ ...prev, [fileKey]: response?.data?.[0] }));
      }
    } catch (err) {
      setFiles((prev) => ({ ...prev, [fileKey]: null }));
      setUploadedUrls((prev) => ({ ...prev, [fileKey]: null }));
      toast.error("Failed to upload document");
    } finally {
      setLoadingFiles((prev) => ({ ...prev, [fileKey]: false }));
    }
  };

  const goToStep2 = async () => {
    const isValid = await trigger(["make", "vehicleModel", "yearOfManufacture", "plateNumber", "vin"]);
    if (isValid) setStep(2);
  };

  const onSubmit = async (data) => {
    console.log(data)

    const payload = {
      make: data.make,
      vehicleModel: data.customVehicleModel || data.vehicleModel,
      yearOfManufacture: data.yearOfManufacture,
      plateNumber: data.plateNumber,
      vin: data.vin,
      accountType: user?.accountType,
      vehicleRegistrationDocument: uploadedUrls.vehicleRegistrationDocument,
      driverLicense: uploadedUrls.driverLicense,
      ...(isIndividual ? {} : { businessLicense: uploadedUrls.businessLicense }),
    };

    const response = await registerVehicle(payload, "Vehicle registered successfully!");

    if (response) {
      setShowConfirmModal(false);
      setStep(4);
      refetchQr();
    }
  };

  return (
    <div className="flex flex-col gap-5 flex-1 relative">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer mt-5 mb-4"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
        {step === 4 ? "Back to Vehicles" : "New Vehicle Form"}
      </button>

      <div className="border border-gray-200 rounded-2xl p-6 flex-1 bg-white">
        {step === 1 && (
          <VehicleInfo
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onNext={goToStep2}
            onClose={onClose}
          />
        )}

        {step === 2 && (
          <Ownership
            register={register}
            watch={watch}
            trigger={trigger}
            errors={errors}
            files={files}
            loadingFiles={loadingFiles}
            onFileChange={handleFileChange}
            onBack={() => setStep(1)}
            onShowConfirm={() => setShowConfirmModal(true)}
            isRegistering={isRegistering}
            isUploading={isUploading}
            onClose={onClose}
          />
        )}

        {step === 4 && (
          <QR />
        )}
      </div>

      {showConfirmModal && (
        <ConfirmAddVehicle
          vehicle={getValues()}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={onSubmit}
          isLoading={isRegistering}
        />
      )}
    </div>
  );
}
