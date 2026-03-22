import { useState } from "react";
import { ArrowLeft, ChevronLeft, Lock, CheckCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SearchableSelect from "../../../../../components/SearchableSelect";
import FileUploadField from "../../../../../components/FileUploadField";
import CTA from "../../../../../components/CTA";
import usePost from "../../../../../hooks/usePost";
import { useEditVehicleMutation } from "../../../../../redux/api/vehicleApiSlice";
import { useUploadDocumentMutation } from "../../../../../redux/api/documentApiSlice";
import FormInputField from "../../../../../components/FormInputField";


const VEHICLE_MAKES = [
  "BMW", "Ford", "Hyundai", "Kia", "Lexus", "Mercedes-Benz", "Toyota",
];

const VEHICLE_MODELS = {
  BMW: ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "M3", "M5"],
  Ford: ["Bronco", "Edge", "Escape", "Explorer", "F-150", "F-250", "Maverick", "Mustang", "Ranger"],
  Hyundai: ["Accent", "Elantra", "Ioniq 5", "Kona", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Venue"],
  Kia: ["Carnival", "EV6", "Forte", "K5", "Niro", "Seltos", "Sorento", "Sportage", "Stinger", "Telluride"],
  Lexus: ["ES300", "ES350", "GS350", "GX460", "IS250", "IS350", "LC500", "LS500", "LX570", "NX300", "RX350", "UX200"],
  "Mercedes-Benz": ["A-Class", "C-Class", "CLA", "E-Class", "GLA", "GLC", "GLE", "GLS", "S-Class"],
  Toyota: ["4Runner", "Camry", "Corolla", "GR86", "Highlander", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza"],
};

const step1Schema = z.object({
  make: z.string().min(1, "Vehicle make is required"),
  model: z.string().min(1, "Vehicle model is required"),
  year: z.string().min(1, "Year of manufacture is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  vin: z.string().optional(),
});

const step2Schema = z.object({
  driversLicense: z
    .any()
    .optional(),
  vehicleRegistrationDocument: z
    .any()
    .refine((v) => v instanceof File || (typeof v === "string" && v.length > 0), {
      message: "Vehicle registration document is required",
    }),
  businessLicense: z.any().optional(),
});

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


export default function EditVehicleForm({ vehicle, onClose }) {
  const [step, setStep] = useState(1);

  const { postData: editVehicle, isLoading: isUpdating } = usePost(useEditVehicleMutation);
  const { postData: uploadDoc } = usePost(useUploadDocumentMutation);

  const [uploadedUrls, setUploadedUrls] = useState({
    driversLicense: vehicle?.driverLicense || null,
    vehicleRegistrationDocument: vehicle?.vehicleRegistrationDocument || null,
    businessLicense: vehicle?.businessLicense || null,
  });

  const [loadingFiles, setLoadingFiles] = useState({
    driversLicense: false,
    vehicleRegistrationDocument: false,
    businessLicense: false,
  });

  const isSubmitting = isUpdating || Object.values(loadingFiles).some(Boolean);

  // Step 1 form
  const {
    register: registerStep1,
    handleSubmit: handleStep1Submit,
    control: controlStep1,
    watch: watchStep1,
    formState: { errors: step1Errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      make: vehicle?.make || "",
      model: vehicle?.vehicleModel || "",
      year: vehicle?.yearOfManufacture || "",
      plateNumber: vehicle?.plateNumber || "",
      vin: vehicle?.vin || "",
    },
  });

  // Step 2 form
  const {
    handleSubmit: handleStep2Submit,
    setValue: setStep2Value,
    watch: watchStep2,
    formState: { errors: step2Errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      driversLicense: vehicle?.driverLicense || null,
      vehicleRegistrationDocument: vehicle?.vehicleRegistrationDocument || null,
      businessLicense: vehicle?.businessLicense || null,
    },
  });

  // Capture step 1 data to merge into final payload
  const [step1Data, setStep1Data] = useState(null);

  const selectedMake = watchStep1("make");
  const driversLicenseFile = watchStep2("driversLicense");
  const vehicleRegDoc = watchStep2("vehicleRegistrationDocument");
  const businessLicenseFile = watchStep2("businessLicense");

  const onStep1Valid = (data) => {
    setStep1Data(data);
    setStep(2);
  };

  const onStep2Valid = async (data) => {
    const payload = {
      make: step1Data.make,
      vehicleModel: step1Data.model,
      yearOfManufacture: step1Data.year,
      plateNumber: step1Data.plateNumber,
      vin: step1Data.vin,
      accountType: vehicle?.accountType,
      ...(vehicle?.accountType === "Automobile Related Business" ? { businessName: vehicle?.businessName } : { fullName: vehicle?.fullName }),
      vehicleRegistrationDocument: uploadedUrls.vehicleRegistrationDocument,
      driverLicense: uploadedUrls.driversLicense,
      ...(vehicle?.accountType === "Automobile Related Business" ? { businessLicense: uploadedUrls.businessLicense } : {}),
    };


    const vehicleId = vehicle?._id || vehicle?.id;

    const result = await editVehicle({ body: payload, id: vehicleId });
    if (result) setStep(3);
  };

  const handleFileChange = (field) => async (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setStep2Value(field, file, { shouldValidate: true });
    setLoadingFiles((prev) => ({ ...prev, [field]: true }));

    try {
      const formData = new FormData();
      formData.append("files", file);
      const res = await uploadDoc(formData, "Document uploaded successfully!");
      if (res) {
        const url = res?.data?.[0] || res?.url;
        setUploadedUrls((prev) => ({ ...prev, [field]: url }));
      }
    } catch (err) {
      console.error(`Upload error for ${field}:`, err);
    } finally {
      setLoadingFiles((prev) => ({ ...prev, [field]: false }));
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit(onStep1Valid)}>
      <StepHeader
        step={1}
        title="Update Vehicle Information"
        subtitle="Edit your car's details to ensure all information stays accurate and up to date."
        onClose={onClose}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Controller
          name="make"
          control={controlStep1}
          render={({ field }) => (
            <SearchableSelect
              label="Vehicle Type"
              options={VEHICLE_MAKES}
              value={field.value}
              onChange={(v) => {
                field.onChange(v);
              }}
              placeholder="Type to search"
              error={step1Errors.make?.message}
            />
          )}
        />

        <Controller
          name="model"
          control={controlStep1}
          render={({ field }) => (
            <SearchableSelect
              label="Vehicle Model"
              options={VEHICLE_MODELS[selectedMake] || []}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type to search"
              disabled={!selectedMake}
              error={step1Errors.model?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <FormInputField
          label="Year of Manufacture"
          placeholder="2017"
          {...registerStep1("year")}
          error={step1Errors.year?.message}
        />

        <FormInputField
          label="Vehicle Plate Number"
          placeholder="Enter Vehicle Plate Number"
          {...registerStep1("plateNumber")}
          error={step1Errors.plateNumber?.message}
        />
      </div>

      <div className="mb-6">
        <FormInputField
          label="VIN"
          placeholder="Enter Vehicle Identification Number"
          {...registerStep1("vin")}
        />
      </div>

      <div className="flex gap-3">
        <CTA name="Cancel" variant="outline" color="blue" onClick={onClose} type="button" />
        <CTA name="Next" color="blue" type="submit" />
      </div>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit(onStep2Valid)}>
      <StepHeader
        step={2}
        title="Proof of Ownership"
        subtitle="Upload a valid ownership document to verify any major changes made to this vehicle's record."
        onClose={onClose}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FileUploadField
            label="Driver's License"
            fieldId="driversLicense"
            fileName={driversLicenseFile}
            onFileChange={handleFileChange("driversLicense")}
            isLoading={loadingFiles.driversLicense}
          />
          {step2Errors.driversLicense && (
            <p className="text-xs text-red-500 -mt-4 mb-4">{step2Errors.driversLicense.message}</p>
          )}
        </div>

        <div>
          <FileUploadField
            label="Vehicle Registration Document"
            fieldId="vehicleRegistrationDocument"
            fileName={vehicleRegDoc}
            onFileChange={handleFileChange("vehicleRegistrationDocument")}
            isLoading={loadingFiles.vehicleRegistrationDocument}
          />
          {step2Errors.vehicleRegistrationDocument && (
            <p className="text-xs text-red-500 -mt-4 mb-4">{step2Errors.vehicleRegistrationDocument.message}</p>
          )}
        </div>
      </div>

      {vehicle?.businessLicense && (
        <div>
          <FileUploadField
            label="Business License / Registration Certificate"
            fieldId="businessLicense"
            fileName={businessLicenseFile}
            onFileChange={handleFileChange("businessLicense")}
            isLoading={loadingFiles.businessLicense}
          />
          {step2Errors.businessLicense && (
            <p className="text-xs text-red-500 -mt-4 mb-4">{step2Errors.businessLicense.message}</p>
          )}
        </div>
      )}

      <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
        <Lock size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-600 leading-relaxed">
          Your privacy is important to us. The documents you upload are only used
          to confirm your vehicle details and ownership. We do not share your
          information with third parties. All data is securely stored and protected.
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-1 px-6 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <CTA name={isSubmitting ? "Updating..." : "Update Vehicle"} color="blue" type="submit" disabled={isSubmitting} />
      </div>
    </form>
  );

  // ─── Step 3 ──────────────────────────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="flex flex-col items-center justify-center h-full py-8 px-4">
      <CheckCircle size={72} className="text-green-500 mb-4" strokeWidth={1.5} />
      <h2 className="text-2xl font-bold text-green-500 mb-2 text-center">
        Vehicle Info Updated Successfully
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-8">
        The vehicle details have been updated and all changes have been saved.
      </p>
      <button
        onClick={onClose}
        className="w-full max-w-sm py-3 bg-(--blue) text-white rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 flex-1">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
        {step === 3 ? "Back to Vehicles" : "Edit Vehicle"}
      </button>

      <div className="border border-gray-200 rounded-2xl p-6 flex-1 bg-white">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}
