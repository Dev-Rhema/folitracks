import { useState } from "react";
import { Camera, Upload } from "lucide-react";
import CTA from "../CTA";
import TabNavigation from "./TabNavigation";
import FormInputField from "./FormInputField";
import PasswordInputField from "./PasswordInputField";

export default function LoginStage({ onContinue, onSignup }) {
  const [activeTab, setActiveTab] = useState("scan");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      onContinue({ method: "email", ...formData });
    }
  };

  const handleScanQR = () => {
    onContinue({ method: "scan" });
  };

  const handleUploadQR = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onContinue({ method: "upload", file });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ fontFamily: "title" }}
        >
          Access Your Vehicle Profile
        </h1>
        <p
          className="text-center text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Access your dashboard however it's most convenient for you. Scan your
          QR code, upload it, or sign in with your email.
        </p>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={[
            { id: "scan", label: "Scan QR Code" },
            { id: "upload", label: "Upload QR Code" },
            { id: "email", label: "Sign in with Email" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Scan QR Tab */}
        {activeTab === "scan" && (
          <div className="space-y-8" style={{ fontFamily: "body" }}>
            <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-12 text-center">
              <Camera size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="text-sm sm:text-base text-gray-600">
                Please allow camera access to scan QR codes
              </p>
            </div>
            <div className="pt-4">
              <CTA
                name={
                  <span className="flex items-center justify-center gap-2">
                    <Camera size={20} /> Start Scan
                  </span>
                }
                color="blue"
                className="w-full"
                onClick={handleScanQR}
              />
            </div>
          </div>
        )}

        {/* Upload QR Tab */}
        {activeTab === "upload" && (
          <div className="space-y-8" style={{ fontFamily: "body" }}>
            <div className="border-2 border-dashed border-gray-300 rounded p-6 sm:p-12 text-center cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                id="qr-upload"
                onChange={handleUploadQR}
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="qr-upload" className="cursor-pointer">
                <Upload size={48} className="mx-auto mb-3 text-gray-400" />
                <p className="text-xs sm:text-sm">
                  <span
                    onClick={() => document.getElementById("qr-upload").click()}
                    className="text-blue-900 font-semibold hover:underline cursor-pointer\"
                  >
                    Click to Upload
                  </span>{" "}
                  or drag and drop
                </p>
              </label>
            </div>
            <div className="pt-4 w-full">
              <CTA
                name="Upload File"
                color="blue"
                className="w-full"
                onClick={() => document.getElementById("qr-upload").click()}
              />
            </div>
          </div>
        )}

        {/* Email Sign In Tab */}
        {activeTab === "email" && (
          <form
            onSubmit={handleEmailSignIn}
            className="space-y-6"
            style={{ fontFamily: "body" }}
          >
            {/* Email */}
            <FormInputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="youremail@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Password */}
            <PasswordInputField
              label="Password"
              name="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleInputChange}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              required
            />

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-blue-900 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <div className="pt-4">
              <CTA
                name="Sign In"
                color="blue"
                className="w-full"
                type="submit"
              />
            </div>
          </form>
        )}

        {/* Sign Up Link */}
        <p
          className="text-center mt-8 text-gray-600"
          style={{ fontFamily: "body" }}
        >
          Don't have your QR code yet?{" "}
          <button
            onClick={onSignup}
            className="text-red-500 font-semibold hover:underline cursor-pointer"
          >
            Register Your Car
          </button>
        </p>
      </div>
    </div>
  );
}
