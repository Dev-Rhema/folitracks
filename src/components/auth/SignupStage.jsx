import { useState } from "react";
import { Check, Circle } from "lucide-react";
import CTA from "../CTA";
import FormInputField from "./FormInputField";
import PasswordInputField from "./PasswordInputField";

export default function SignupStage({ onContinue, onScanQR }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    special: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (pwd) => {
    const checks = {
      length: pwd.length >= 8,
      number: /\d/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      special: /[!@#$%^&*]/.test(pwd),
    };
    setPasswordChecks(checks);
    return checks;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all password checks pass
    const allChecksPassed = Object.values(passwordChecks).every(
      (check) => check === true,
    );

    if (!allChecksPassed) {
      alert("Please ensure all password requirements are met.");
      return;
    }

    // Validate all required fields are filled
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      alert("Please fill in all fields.");
      return;
    }

    onContinue(formData);
  };

  const handleContinueClick = () => {
    const e = { preventDefault: () => {} };
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ fontFamily: "title" }}
        >
          Welcome to Folitracks
        </h1>
        <p
          className="text-center text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Set up your account in seconds to securely manage your vehicles.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          style={{ fontFamily: "body" }}
        >
          {/* Full Name */}
          <FormInputField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Obafemi Martins"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <FormInputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="youremail@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <FormInputField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+234 912 653 1214"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <PasswordInputField
            label="Password"
            name="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />

          {/* Password Requirements */}
          <div
            className="mt-4 space-y-2 text-xs sm:text-sm"
            style={{ fontFamily: "body" }}
          >
            <div className="flex items-center gap-2">
              {passwordChecks.length ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.length ? "text-gray-600" : "text-gray-400"
                }
              >
                Must be at least 8 characters long
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordChecks.number ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.number ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one number (0-9)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordChecks.uppercase ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.uppercase ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one uppercase letter (A-Z)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordChecks.lowercase ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.lowercase ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one lowercase letter (a-z)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordChecks.special ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.special ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one special character (!@#$%^&*)
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <CTA
              name="Continue"
              color="blue"
              className="w-full"
              onClick={handleContinueClick}
            />
          </div>
        </form>

        {/* Scan QR Link */}
        <p
          className="text-center mt-6 text-gray-600"
          style={{ fontFamily: "body" }}
        >
          Already have your QR Code?{" "}
          <button
            onClick={onScanQR}
            className="text-red-500 font-semibold hover:underline cursor-pointer"
          >
            Scan QR Code
          </button>
        </p>

        {/* Footer */}
        <p
          className="text-center text-xs text-gray-600 mt-6"
          style={{ fontFamily: "body" }}
        >
          By clicking Continue to create an account, I agree that I have read
          and accepted the{" "}
          <a href="#" className="text-blue-900 hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-900 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
