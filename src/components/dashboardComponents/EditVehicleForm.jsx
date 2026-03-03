import { useState } from "react";
import { ArrowLeft, ChevronLeft, Lock, CheckCircle } from "lucide-react";
import SearchableSelect from "../auth/SearchableSelect";
import FileUploadField from "../auth/FileUploadField";
import CTA from "../CTA";

// ─── Vehicle data (same as AddVehicleForm) ────────────────────────────────────

const VEHICLE_MAKES = [
  "BMW", "Ford", "Hyundai", "Kia", "Lexus", "Mercedes-Benz", "Toyota",
];

const VEHICLE_MODELS = {
  BMW:             ["2 Series", "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "M3", "M5"],
  Ford:            ["Bronco", "Edge", "Escape", "Explorer", "F-150", "F-250", "Maverick", "Mustang", "Ranger"],
  Hyundai:         ["Accent", "Elantra", "Ioniq 5", "Kona", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tucson", "Venue"],
  Kia:             ["Carnival", "EV6", "Forte", "K5", "Niro", "Seltos", "Sorento", "Sportage", "Stinger", "Telluride"],
  Lexus:           ["ES300", "ES350", "GS350", "GX460", "IS250", "IS350", "LC500", "LS500", "LX570", "NX300", "RX350", "UX200"],
  "Mercedes-Benz": ["A-Class", "C-Class", "CLA", "E-Class", "GLA", "GLC", "GLE", "GLS", "S-Class"],
  Toyota:          ["4Runner", "Camry", "Corolla", "GR86", "Highlander", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza"],
};

// ─── Parse existing vehicle string into form fields ───────────────────────────

function parseVehicleString(vehicleStr = "") {
  const words = vehicleStr.trim().split(" ");
  const year = words[words.length - 1];
  const nameWithoutYear = words.slice(0, -1).join(" ");

  let make = "";
  let model = "";

  for (const m of VEHICLE_MAKES) {
    const searchStr = m.replace("-", " "); // "Mercedes-Benz" → "Mercedes Benz"
    if (nameWithoutYear.toLowerCase().startsWith(searchStr.toLowerCase())) {
      make = m;
      model = nameWithoutYear.slice(searchStr.length).trim();
      break;
    }
  }

  return { make, model, year };
}

// ─── Shared sub-components ────────────────────────────────────────────────────

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
        className={`w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 ${
          error ? "border-red-400" : "border-gray-200"
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

function UploadField({ label, fieldId, fileName, onFileChange, error }) {
  return (
    <div>
      <FileUploadField
        label={label}
        fieldId={fieldId}
        fileName={fileName}
        onFileChange={onFileChange}
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function EditVehicleForm({ vehicle, onClose }) {
  const parsed = parseVehicleString(vehicle?.vehicle);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    make: vehicle?.make || parsed.make,
    model: vehicle?.model || parsed.model,
    year: vehicle?.year || parsed.year,
    plateNumber: vehicle?.plateNumber || vehicle?.registrationNumber || "",
    vin: vehicle?.vin || "",
    regDoc: vehicle?.regDoc || null,
    driversLicense: vehicle?.driversLicense || null,
    businessLicense: vehicle?.businessLicense || null,
    vehicleRegDoc2: vehicle?.vehicleRegDoc2 || null,
    repDriversLicense: vehicle?.repDriversLicense || null,
  });

  const update = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ─── Validation ──────────────────────────────────────────────────────────

  const validateStep1 = () => {
    const errs = {};
    if (!formData.make)        errs.make        = "Vehicle make is required";
    if (!formData.model)       errs.model       = "Vehicle model is required";
    if (!formData.year)        errs.year        = "Year of manufacture is required";
    if (!formData.plateNumber) errs.plateNumber = "Plate number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.regDoc)         errs.regDoc         = "Vehicle registration document is required";
    if (!formData.driversLicense) errs.driversLicense = "Driver's license is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.businessLicense)   errs.businessLicense   = "Business license is required";
    if (!formData.vehicleRegDoc2)    errs.vehicleRegDoc2    = "Vehicle registration document is required";
    if (!formData.repDriversLicense) errs.repDriversLicense = "Representative's driver's license is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ─── Navigation ──────────────────────────────────────────────────────────

  const goToStep2 = () => { if (validateStep1()) setStep(2); };
  const goToStep3 = () => { if (validateStep2()) setStep(3); };
  const submitUpdate = () => { if (validateStep3()) setStep(4); };

  // ─── Step renders ─────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div>
      <StepHeader
        step={1}
        title="Update Vehicle Information"
        subtitle="Edit your car's details to ensure all information stays accurate and up to date."
        onClose={onClose}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SearchableSelect
          label="Vehicle Type"
          options={VEHICLE_MAKES}
          value={formData.make}
          onChange={(v) => { update("make")(v); update("model")(""); }}
          placeholder="Type to search"
          error={errors.make}
        />
        <SearchableSelect
          label="Vehicle Model"
          options={VEHICLE_MODELS[formData.make] || []}
          value={formData.model}
          onChange={update("model")}
          placeholder="Type to search"
          disabled={!formData.make}
          error={errors.model}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <VehicleInput
          label="Year of Manufacture"
          placeholder="2017"
          value={formData.year}
          onChange={(e) => update("year")(e.target.value)}
          error={errors.year}
        />
        <VehicleInput
          label="Vehicle Plate Number"
          placeholder="Enter Vehicle Plate Number"
          value={formData.plateNumber}
          onChange={(e) => update("plateNumber")(e.target.value)}
          error={errors.plateNumber}
        />
      </div>
      <div className="mb-6">
        <VehicleInput
          label="VIN"
          labelExtra="(Optional)"
          placeholder="Enter Vehicle Identification Number"
          value={formData.vin}
          onChange={(e) => update("vin")(e.target.value)}
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
        title="Proof of Ownership"
        subtitle="Upload a valid ownership document to verify any major changes made to this vehicle's record."
        onClose={onClose}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UploadField
          label="Vehicle Registration Document"
          fieldId="editRegDoc"
          fileName={formData.regDoc}
          onFileChange={handleFileChange("regDoc")}
          error={errors.regDoc}
        />
        <UploadField
          label="Driver's License"
          fieldId="editDriversLicense"
          fileName={formData.driversLicense}
          onFileChange={handleFileChange("driversLicense")}
          error={errors.driversLicense}
        />
      </div>
      <PrivacyNotice />
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => { setErrors({}); setStep(1); }}
          className="flex items-center gap-1 px-6 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <CTA name="Next" color="blue" onClick={goToStep3} />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <StepHeader
        step={2}
        title="Proof of Ownership"
        subtitle="Upload a valid ownership document to verify any major changes made to this vehicle's record."
        onClose={onClose}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UploadField
          label="Business License / Registration Certificate"
          fieldId="editBusinessLicense"
          fileName={formData.businessLicense}
          onFileChange={handleFileChange("businessLicense")}
          error={errors.businessLicense}
        />
        <UploadField
          label="Vehicle Registration Document"
          fieldId="editVehicleRegDoc2"
          fileName={formData.vehicleRegDoc2}
          onFileChange={handleFileChange("vehicleRegDoc2")}
          error={errors.vehicleRegDoc2}
        />
      </div>
      <UploadField
        label="Representative's Driver's License"
        fieldId="editRepDriversLicense"
        fileName={formData.repDriversLicense}
        onFileChange={handleFileChange("repDriversLicense")}
        error={errors.repDriversLicense}
      />
      <PrivacyNotice />
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => { setErrors({}); setStep(2); }}
          className="flex items-center gap-1 px-6 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <CTA name="Update Vehicle" color="blue" onClick={submitUpdate} />
      </div>
    </div>
  );

  const renderStep4 = () => (
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

  // ─── Layout ───────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5 flex-1">
      {/* Page-level back header */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
        {step === 4 ? "Back to Vehicles" : "Edit Vehicle"}
      </button>

      {/* Form card — fills remaining height */}
      <div className="border border-gray-200 rounded-2xl p-6 flex-1">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
}
