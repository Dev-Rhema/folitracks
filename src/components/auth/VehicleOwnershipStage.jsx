import { useState } from "react";
import { ChevronLeft, Upload, Lock, FileText } from "lucide-react";
import CTA from "../CTA";

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
            <select
              value={accountType}
              onChange={(e) => handleAccountTypeChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
            >
              <option value="individual">Individual Car Owner</option>
              <option value="business">Automobile Related Business</option>
            </select>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Registration Document
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-8 text-center">
                  {files.registrationDocument ? (
                    <div className="bg-black text-white p-3 rounded inline-block flex items-center gap-2">
                      <FileText size={18} /> {files.registrationDocument.name}
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("regDoc").click()
                          }
                          className="text-blue-900 font-semibold hover:underline"
                        >
                          Click to Upload
                        </button>{" "}
                        or drag and drop
                      </p>
                      <input
                        id="regDoc"
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "registrationDocument")
                        }
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Driver's License */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: "title" }}
                >
                  Driver's License
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-8 text-center">
                  {files.driverLicense ? (
                    <div className="bg-black text-white p-3 rounded inline-block flex items-center gap-2">
                      <FileText size={18} /> {files.driverLicense.name}
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("driverLic").click()
                          }
                          className="text-blue-900 font-semibold hover:underline"
                        >
                          Click to Upload
                        </button>{" "}
                        or drag and drop
                      </p>
                      <input
                        id="driverLic"
                        type="file"
                        onChange={(e) => handleFileChange(e, "driverLicense")}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
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
                <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-8 text-center">
                  {files.businessLicense ? (
                    <div className="bg-black text-white p-3 rounded inline-block flex items-center gap-2">
                      <FileText size={18} /> {files.businessLicense.name}
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("busLic").click()
                          }
                          className="text-blue-900 font-semibold hover:underline"
                        >
                          Click to Upload
                        </button>{" "}
                        or drag and drop
                      </p>
                      <input
                        id="busLic"
                        type="file"
                        onChange={(e) => handleFileChange(e, "businessLicense")}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Vehicle Registration Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Registration Document
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center">
                  {files.registrationDocument ? (
                    <div className="bg-black text-white p-3 rounded inline-block flex items-center gap-2">
                      <FileText size={18} /> {files.registrationDocument.name}
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("busRegDoc").click()
                          }
                          className="text-blue-900 font-semibold hover:underline"
                        >
                          Click to Upload
                        </button>{" "}
                        or drag and drop
                      </p>
                      <input
                        id="busRegDoc"
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "registrationDocument")
                        }
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Representative's Driver License */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: "title" }}
                >
                  Representative's Driver's License
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-8 text-center">
                  {files.represLicense ? (
                    <div className="bg-black text-white p-3 rounded inline-block flex items-center gap-2">
                      <FileText size={18} /> {files.represLicense.name}
                    </div>
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className="mx-auto mb-2 text-gray-400"
                      />
                      <p className="text-xs sm:text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("repLic").click()
                          }
                          className="text-blue-900 font-semibold hover:underline"
                        >
                          Click to Upload
                        </button>{" "}
                        or drag and drop
                      </p>
                      <input
                        id="repLic"
                        type="file"
                        onChange={(e) => handleFileChange(e, "represLicense")}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Privacy Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-xs sm:text-sm text-blue-800 flex gap-2">
              <Lock size={20} className="flex-shrink-0 mt-0.5" />
              <span>
                Your privacy is important to us. The documents you upload are
                only used to confirm your vehicle details and ownership. We do
                not share your information with third parties. All data is
                securely stored and protected.
              </span>
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <CTA
              name="Continue"
              color="blue"
              onClick={() => handleSubmit({ preventDefault: () => {} })}
            />
          </div>
        </form>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="mt-8 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <ChevronLeft size={20} /> Back
        </button>
      </div>
    </div>
  );
}
