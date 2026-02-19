import { useState } from "react";
import CTA from "../CTA";
import FormInputField from "./FormInputField";
import AuthLayout from "./AuthLayout";
import CustomSelect from "./CustomSelect";

const VEHICLE_MAKES = [
  "Toyota",
  "Lexus",
  "Mercedes-Benz",
  "Ford",
  "BMW",
  "Hyundai",
  "KIA",
  "Other",
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

export default function VehicleRegistrationStage({ onContinue, onBack }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    plateNumber: "",
    vin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.make &&
      formData.model &&
      formData.year &&
      formData.plateNumber
    ) {
      onContinue(formData);
    }
  };

  const availableModels = VEHICLE_MODELS[formData.make] || [];

  return (
    <AuthLayout
      title="Vehicle Registration"
      subtitle="Provide your car details so we can build an accurate service profile for you."
      onBack={onBack}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        style={{ fontFamily: "body" }}
      >
        {/* Vehicle Make */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: "title" }}
          >
            Vehicle Make
          </label>
          <CustomSelect
            value={formData.make}
            onChange={(value) =>
              handleChange({ target: { name: "make", value } })
            }
            options={VEHICLE_MAKES.map((make) => ({
              value: make,
              label: make,
            }))}
            placeholder="Type to search"
          />
        </div>

        {/* Vehicle Model */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: "title" }}
          >
            Vehicle Model
          </label>
          <CustomSelect
            value={formData.model}
            onChange={(value) =>
              handleChange({ target: { name: "model", value } })
            }
            disabled={!formData.make}
            options={availableModels.map((model) => ({
              value: model,
              label: model,
            }))}
            placeholder="Type to search"
          />
        </div>

        {/* Year of Manufacture */}
        <FormInputField
          label="Year of Manufacture"
          name="year"
          type="text"
          placeholder="2017"
          value={formData.year}
          onChange={handleChange}
          required
        />

        {/* Vehicle Plate Number */}
        <FormInputField
          label="Vehicle Plate Number"
          name="plateNumber"
          type="text"
          placeholder="Enter Vehicle Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />

        {/* VIN */}
        <FormInputField
          label="VIN (Optional)"
          name="vin"
          type="text"
          placeholder="Enter Vehicle Identification Number"
          value={formData.vin}
          onChange={handleChange}
          required={false}
        />

        {/* Continue Button */}
        <div className="pt-4">
          <CTA
            name="Continue"
            color="blue"
            className="w-full"
            onClick={() => handleSubmit({ preventDefault: () => {} })}
          />
        </div>
      </form>
    </AuthLayout>
  );
}
