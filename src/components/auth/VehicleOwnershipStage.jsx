import { useState } from "react";
import { Lock } from "lucide-react";
import CTA from "../CTA";
import FileUploadField from "./FileUploadField";
import FormInputField from "./FormInputField";
import AuthLayout from "./AuthLayout";
import CustomSelect from "./CustomSelect";

export default function VehicleOwnershipStage({
  onContinue,
  onBack,
  fullName,
}) {
  const [accountType, setAccountType] = useState("individual");
  const [files, setFiles] = useState({
    registrationDocument: null,
    driverLicense: null,
    businessLicense: null,
    represLicense: null,
  });
  const [formData, setFormData] = useState({
    name: accountType === "individual" ? fullName : "",
  });

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setFormData({ name: type === "individual" ? fullName : "" });
    setFiles({
      registrationDocument: null,
      driverLicense: null,
      businessLicense: null,
      represLicense: null,
    });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [fileType]: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFiles =
      accountType === "individual"
        ? [files.registrationDocument, files.driverLicense]
        : [
            files.businessLicense,
            files.registrationDocument,
            files.represLicense,
          ];

    if (requiredFiles.every((f) => f)) {
      onContinue({
        accountType,
        name: formData.name,
        files,
      });
    }
  };

  const isIndividual = accountType === "individual";

  return (
    <AuthLayout
      title="Confirm Vehicle Ownership"
      subtitle="Provide the required documents to prove you are the rightful owner or authorized dealer of this vehicle."
      onBack={onBack}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        style={{ fontFamily: "body" }}
      >
        {/* Account Type */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: "title" }}
          >
            Account Type
          </label>
          <CustomSelect
            value={accountType}
            onChange={handleAccountTypeChange}
            options={[
              { value: "individual", label: "Individual Car Owner" },
              { value: "business", label: "Automobile Related Business" },
            ]}
            placeholder="Select account type"
          />
        </div>

        {/* Name Field */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            style={{ fontFamily: "title" }}
          >
            {isIndividual ? "Full Name" : "Business Name"}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder={
              isIndividual
                ? "Obafemi Olusuntimilehin"
                : "Optional Olusuntimilehin"
            }
            className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Individual Car Owner Documents */}
        {isIndividual && (
          <>
            {/* Vehicle Registration Document */}
            <FileUploadField
              label="Vehicle Registration Document"
              fieldId="regDoc"
              fileName={files.registrationDocument}
              onFileChange={(e) => handleFileChange(e, "registrationDocument")}
            />

            {/* Driver's License */}
            <FileUploadField
              label="Driver's License"
              fieldId="driverLic"
              fileName={files.driverLicense}
              onFileChange={(e) => handleFileChange(e, "driverLicense")}
            />
          </>
        )}

        {/* Business Documents */}
        {!isIndividual && (
          <>
            {/* Business License */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                style={{ fontFamily: "title" }}
              >
                Must match Business License/registration certificate
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Business License / Registration Certificate
              </p>
              <FileUploadField
                label=""
                fieldId="busLic"
                fileName={files.businessLicense}
                onFileChange={(e) => handleFileChange(e, "businessLicense")}
              />
            </div>

            {/* Vehicle Registration Document */}
            <FileUploadField
              label="Vehicle Registration Document"
              fieldId="busRegDoc"
              fileName={files.registrationDocument}
              onFileChange={(e) => handleFileChange(e, "registrationDocument")}
            />

            {/* Representative's Driver License */}
            <FileUploadField
              label="Representative's Driver's License"
              fieldId="repLic"
              fileName={files.represLicense}
              onFileChange={(e) => handleFileChange(e, "represLicense")}
            />
          </>
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
            onClick={() => handleSubmit({ preventDefault: () => {} })}
          />
        </div>
      </form>
    </AuthLayout>
  );
}
