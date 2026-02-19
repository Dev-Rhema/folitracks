import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import CTA from "../CTA";
import FormInputField from "./FormInputField";

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
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ fontFamily: "title" }}
        >
          Vehicle Registration
        </h1>
        <p
          className="text-center text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Provide your car details so we can build an accurate service profile
          for you.
        </p>

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
            <select
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Type to search</option>
              {VEHICLE_MAKES.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Model */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "title" }}
            >
              Vehicle Model
            </label>
            <select
              name="model"
              value={formData.model}
              onChange={handleChange}
              disabled={!formData.make}
              className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
              required
            >
              <option value="">Type to search</option>
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
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

        {/* Back Button */}
        <button
          onClick={onBack}
          className="mt-8 text-gray-600 hover:text-gray-900 flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft size={20} /> Back
        </button>
      </div>
    </div>
  );
}
