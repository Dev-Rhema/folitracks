import { useState, useRef } from "react";
import { ArrowLeft, ChevronLeft, Lock, Download, CheckCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import SearchableSelect from "../../../components/auth/SearchableSelect";
import FileUploadField from "../../../components/auth/FileUploadField";
import CTA from "../../../components/CTA";

// ─── Vehicle data ─────────────────────────────────────────────────────────────

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

// ─── Shared input field ───────────────────────────────────────────────────────

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

// ─── Step card header ─────────────────────────────────────────────────────────

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

// ─── File upload with error ───────────────────────────────────────────────────

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

// ─── Privacy notice ───────────────────────────────────────────────────────────

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

export default function AddVehicleForm({ onClose, onVehicleAdded }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    vin: "",
    regDoc: null,
    driversLicense: null,
    businessLicense: null,
    vehicleRegDoc2: null,
    repDriversLicense: null,
  });

  const qrRef = useRef(null);

  const update = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ─── Validation ────────────────────────────────────────────────────────────

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
    if (!formData.regDoc)          errs.regDoc          = "Vehicle registration document is required";
    if (!formData.driversLicense)  errs.driversLicense  = "Driver's license is required";
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

  // ─── Navigation ────────────────────────────────────────────────────────────

  const goToStep2 = () => {
    if (validateStep1()) setStep(2);
  };

  const goToStep3 = () => {
    if (validateStep2()) setStep(3);
  };

  const submitVehicle = () => {
    if (!validateStep3()) return;
    onVehicleAdded?.({
      vehicle: `${formData.make} ${formData.model} ${formData.year}`,
      registrationNumber: formData.plateNumber,
      lastServiceDate: "—",
      nextServiceDate: "—",
      // preserve full form data for editing
      make: formData.make,
      model: formData.model,
      year: formData.year,
      plateNumber: formData.plateNumber,
      vin: formData.vin,
      regDoc: formData.regDoc,
      driversLicense: formData.driversLicense,
      businessLicense: formData.businessLicense,
      vehicleRegDoc2: formData.vehicleRegDoc2,
      repDriversLicense: formData.repDriversLicense,
    });
    setStep(4);
  };

  // ─── QR / downloads ────────────────────────────────────────────────────────

  const qrValue = `make=${formData.make}&model=${formData.model}&year=${formData.year}&plate=${formData.plateNumber}`;

  const handleDownloadImage = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `vehicle-qr-${formData.plateNumber || "code"}.png`;
    a.click();
  };

  // ─── Step renders ──────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div>
      <StepHeader
        step={1}
        title="Add Your Vehicle"
        subtitle="Enter the basic information about your car so we can register it to your account."
        onClose={onClose}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <SearchableSelect
          label="Vehicle Make"
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
        title="Upload Proof of Ownership"
        subtitle="Submit the required documents to confirm you're the rightful owner."
        onClose={onClose}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UploadField
          label="Vehicle Registration Document"
          fieldId="regDoc"
          fileName={formData.regDoc}
          onFileChange={handleFileChange("regDoc")}
          error={errors.regDoc}
        />
        <UploadField
          label="Driver's License"
          fieldId="driversLicense"
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
        title="Upload Proof of Ownership"
        subtitle="Submit the required documents to confirm you're the rightful owner."
        onClose={onClose}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UploadField
          label="Business License / Registration Certificate"
          fieldId="businessLicense"
          fileName={formData.businessLicense}
          onFileChange={handleFileChange("businessLicense")}
          error={errors.businessLicense}
        />
        <UploadField
          label="Vehicle Registration Document"
          fieldId="vehicleRegDoc2"
          fileName={formData.vehicleRegDoc2}
          onFileChange={handleFileChange("vehicleRegDoc2")}
          error={errors.vehicleRegDoc2}
        />
      </div>
      <UploadField
        label="Representative's Driver's License"
        fieldId="repDriversLicense"
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
        <CTA name="Add Vehicle" color="blue" onClick={submitVehicle} />
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
      <div ref={qrRef} className="mb-8">
        <QRCodeCanvas value={qrValue} size={160} />
      </div>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={() => window.print()}
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

  // ─── Layout ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5 flex-1">
      {/* Page-level back header */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
        {step === 4 ? "Back to Vehicles" : "New Vehicle Form"}
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
