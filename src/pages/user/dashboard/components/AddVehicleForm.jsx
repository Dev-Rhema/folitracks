import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ChevronLeft, Lock, Download, CheckCircle, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import SearchableSelect from "../../../../components/auth/SearchableSelect";
import FileUploadField from "../../../../components/auth/FileUploadField";
import CTA from "../../../../components/CTA";

import { vehicleFullSchema } from "../../../../validation/authSchema";
import { useGetVehiclesQuery, useRegisterVehicleMutation } from "../../../../redux/api/vehicleApiSlice";
import { useUploadDocumentMutation } from "../../../../redux/api/documentApiSlice";
import usePost from "../../../../hooks/usePost";
import ConfirmAddVehicle from "./ConfirmAddVehicleModal";
import { useGetUserQRQuery } from "../../../../redux/api/authApiSlice";
import useDownloadQr from "../../../../hooks/useDownloadQr";
import useGet from "../../../../hooks/useGet";


// ─── Constants ───────────────────────────────────────────────────────────────

const VEHICLE_MAKES = [
  "BMW", "Ford", "Hyundai", "Kia", "Lexus", "Mercedes-Benz", "Toyota", "Honda", "Nissan", "Audi", "Volkswagen", "Other"
];

const VEHICLE_MODELS = {
  BMW: ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "M3", "M5"],
  Ford: ["Bronco", "Edge", "Escape", "Explorer", "F-150", "F-250", "Maverick", "Mustang", "Ranger"],
  Hyundai: ["Accent", "Elantra", "Ioniq 5", "Kona", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Venue"],
  Kia: ["Carnival", "EV6", "Forte", "K5", "Niro", "Seltos", "Sorento", "Sportage", "Stinger", "Telluride"],
  Lexus: ["ES300", "ES350", "GS350", "GX460", "IS250", "IS350", "LC500", "LS500", "LX570", "NX300", "RX350", "UX200"],
  "Mercedes-Benz": ["A-Class", "C-Class", "CLA", "E-Class", "GLA", "GLC", "GLE", "GLS", "S-Class"],
  Toyota: ["4Runner", "Camry", "Corolla", "GR86", "Highlander", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza"],
  Honda: ["Accord", "Civic", "CR-V", "HR-V", "Pilot", "Odyssey"],
  Nissan: ["Altima", "Maxima", "Rogue", "Sentra", "Titan", "Versa"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7", "Q8"],
  Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "ID.4"],
  Other: ["Other Model"]
};

// ─── Shared UI Components ───────────────────────────────────────────────────

function VehicleInput({ label, labelExtra, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {labelExtra && (
          <span className="text-gray-400 font-normal italic ml-1">{labelExtra}</span>
        )}
      </label>
      <input
        {...inputProps}
        className={`w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 ${error ? "border-red-400" : "border-gray-200"
          }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function StepHeader({ step, title, subtitle, onClose }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-base font-bold text-gray-900">
          Step {step}: {title}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-6 mt-0.5 cursor-pointer"
      >
        ×
      </button>
    </div>
  );
}

function UploadField({ label, fieldId, fileName, onFileChange, error, isLoading }) {
  return (
    <div>
      <FileUploadField
        label={label}
        fieldId={fieldId}
        fileName={fileName}
        onFileChange={onFileChange}
        isLoading={isLoading}
      />
      {error && <p className="text-xs text-red-500 -mt-4 mb-4">{error}</p>}
    </div>
  );
}

function PrivacyNotice() {
  return (
    <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
      <Lock size={18} className="text-blue-500 shrink-0 mt-0.5" />
      <p className="text-sm text-blue-600 leading-relaxed">
        Your privacy is important to us. The documents you upload are only used
        to confirm your vehicle details and ownership. We do not share your
        information with third parties. All data is securely stored and protected.
      </p>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AddVehicleForm({ onClose, onVehicleAdded }) {
  const [step, setStep] = useState(1);
  const qrRef = useRef(null);
  const userInfo = useSelector((state) => state.app.userInfo);

  // API Mutations
  const { postData: registerVehicle, isLoading: isRegistering } = usePost(useRegisterVehicleMutation);
  const { postData: uploadDocument, isLoading: isUploading } = usePost(useUploadDocumentMutation);
  const { data: userQrData, isLoading: isUserQrLoading, refetch: refetchQr } = useGetUserQRQuery(undefined, {
    skip: step !== 4
  });
  const { refetch: refetchVehicles } = useGetVehiclesQuery()

  const { downloadImage, downloadPDF } = useDownloadQr();

  // File States
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

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vehicleFullSchema),
    mode: "all",
    defaultValues: {
      make: "",
      vehicleModel: "",
      yearOfManufacture: "",
      plateNumber: "",
      vin: "",
      accountType: "individual",
      fullName: userInfo?.fullname || "",
      businessName: "",
    },
  });

  const selectedMake = watch("make");
  const accountType = watch("accountType");
  const isIndividual = accountType === "individual";

  // Handle File Uploads
  const handleFileChange = async (e, fileKey) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fileKey]: file }));
      setLoadingFiles((prev) => ({ ...prev, [fileKey]: true }));

      try {
        const formData = new FormData();
        formData.append("files", file);

        const response = await uploadDocument(formData, "Document uploaded successfully!");
        if (response) {
          const url = response?.data?.[0];
          setUploadedUrls((prev) => ({ ...prev, [fileKey]: url }));
        }
      } catch (error) {
        console.error("Upload error:", error);
        setFiles((prev) => ({ ...prev, [fileKey]: null }));
        setUploadedUrls((prev) => ({ ...prev, [fileKey]: null }));
        toast.error("Failed to upload document");
      } finally {
        setLoadingFiles((prev) => ({ ...prev, [fileKey]: false }));
      }
    }
  };

  // Step Navigation
  const goToStep2 = async () => {
    const isValid = await trigger(["make", "vehicleModel", "yearOfManufacture", "plateNumber", "vin"]);
    if (isValid) setStep(2);
  };

  const goToStep3 = async () => {
    // Basic check before moving to step 3 (which asks for docs)
    setStep(3);
  };

  // Final Submission
  const onSubmit = async (data) => {
    const requiredUrls = isIndividual
      ? [uploadedUrls.vehicleRegistrationDocument, uploadedUrls.driverLicense]
      : [uploadedUrls.vehicleRegistrationDocument, uploadedUrls.businessLicense];

    if (!requiredUrls.every(Boolean)) {
      toast.error("Please upload all required documents and wait for them to finish.");
      return;
    }

    try {
      const payload = {
        make: data.make,
        vehicleModel: data.vehicleModel,
        yearOfManufacture: data.yearOfManufacture,
        plateNumber: data.plateNumber,
        vin: data.vin,
        accountType: data.accountType === "individual" ? "Individual Car Owner" : "Automobile Related Business",
        ...(isIndividual ? { fullName: data.fullName } : { businessName: data.businessName }),
        vehicleRegistrationDocument: uploadedUrls.vehicleRegistrationDocument,
        driverLicense: uploadedUrls.driverLicense,
        ...(isIndividual ? {} : { businessLicense: uploadedUrls.businessLicense }),
      };

      const response = await registerVehicle(payload, "Vehicle registered successfully!");
      if (response) {
        onVehicleAdded?.({
          vehicle: `${data.make} ${data.vehicleModel} ${data.yearOfManufacture}`,
          registrationNumber: data.plateNumber,
          lastServiceDate: "—",
          nextServiceDate: "—",
        });
        setStep(4);
        setShowConfirmModal(false);
        refetchQr();
        refetchVehicles()
      }
    } catch (error) {
      console.error("Error during vehicle registration:", error);
      const errorMsg = error?.data?.message || error?.message || "Failed to register vehicle. Please try again.";
      toast.error(errorMsg);
    }
  };

  const handleDownloadImage = () => {
    downloadImage(userQrData?.data?.base64, getValues("plateNumber"));
  };

  const handleDownloadPDF = () => {
    downloadPDF(userQrData?.data?.base64, {
      make: getValues("make"),
      model: getValues("vehicleModel"),
      plateNumber: getValues("plateNumber"),
    });
  };

  // ─── Step Renders (Restoring Original Layout) ───────────────────────────────

  const renderStep1 = () => (
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
        <CTA name="Next" color="blue" onClick={goToStep2} />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <StepHeader
        step={2}
        title="Upload Proof of Ownership"
        subtitle="Submit the required documents to confirm you're the rightful owner."
        onClose={onClose}
      />
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <select
          {...register("accountType")}
          className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="individual">Individual Car Owner</option>
          <option value="business">Automobile Related Business</option>
        </select>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <UploadField
          label="Vehicle Registration Document"
          fieldId="regDoc"
          fileName={files.vehicleRegistrationDocument}
          onFileChange={(e) => handleFileChange(e, "vehicleRegistrationDocument")}
          isLoading={loadingFiles.vehicleRegistrationDocument}
        />

        <UploadField
          label="Driver's License"
          fieldId="driversLicense"
          fileName={files.driverLicense}
          onFileChange={(e) => handleFileChange(e, "driverLicense")}
          isLoading={loadingFiles.driverLicense}
        />

        {!isIndividual && <UploadField
          label="Business License"
          fieldId="businessLicense"
          fileName={files.businessLicense}
          onFileChange={(e) => handleFileChange(e, "businessLicense")}
          isLoading={loadingFiles.businessLicense}
        />}

      </div>
      <PrivacyNotice />
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setStep(1)}
          className="flex items-center gap-1 px-6 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          type="button"
          onClick={async () => {
            const fields = ["accountType", isIndividual ? "fullName" : "businessName"];
            const isValid = await trigger(fields);
            if (isValid) setShowConfirmModal(true);
          }}
        >
          <CTA
            name={isRegistering ? "Submitting..." : "Add Vehicle"}
            color="blue"
            disabled={isRegistering || isUploading}
          />
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="flex flex-col items-center justify-center h-full py-8 px-4">
      <CheckCircle size={64} className="text-green-500 mb-4" strokeWidth={1.5} />
      <h2 className="text-2xl font-bold text-green-500 mb-2">
        Vehicle Added Successfully
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-8">
        Your unique QR code has been generated. Use it to access your vehicle's
        service history anytime.
      </p>

      <div className="w-40 h-40 rounded flex items-center justify-center relative mb-8">
        {isUserQrLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-xs text-gray-500 font-medium">Generating QR...</span>
          </div>
        ) : userQrData?.data?.base64 ? (
          <img
            src={userQrData?.data?.base64}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-xs text-gray-400 px-4">Failed to load QR code</div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleDownloadPDF}
          className="w-full flex items-center justify-center gap-2 py-3 bg-(--blue) text-white rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          <Download size={16} />
          Download as PDF
        </button>
        <button
          onClick={handleDownloadImage}
          className="w-full flex items-center justify-center gap-2 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <Download size={16} />
          Download as Image
        </button>
      </div>
    </div>
  );

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
        <div> {/* Wrapping form items without a top-level form tag to handle manual submit */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 4 && renderStep4()}
        </div>
      </div>

      {showConfirmModal && <ConfirmAddVehicle vehicle={getValues()} onClose={() => setShowConfirmModal(false)} onConfirm={onSubmit} isLoading={isRegistering} />}
    </div>
  );
}
