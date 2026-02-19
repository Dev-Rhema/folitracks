import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import CTA from "../CTA";

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
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "title" }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Obafemi Martins"
              className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "title" }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
              className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "title" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 912 653 1214"
              className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "title" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-gray-100 rounded border border-gray-200 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Requirements */}
            <div
              className="mt-4 space-y-2 text-xs sm:text-sm"
              style={{ fontFamily: "body" }}
            >
              <div
                className={`flex items-center gap-2 ${passwordChecks.length ? "text-gray-600" : "text-gray-400"}`}
              >
                {passwordChecks.length ? (
                  <Check size={16} />
                ) : (
                  <div className="w-4 h-4" />
                )}
                Must be at least 8 characters long
              </div>
              <div
                className={`flex items-center gap-2 ${passwordChecks.number ? "text-gray-600" : "text-gray-400"}`}
              >
                {passwordChecks.number ? (
                  <Check size={16} />
                ) : (
                  <div className="w-4 h-4" />
                )}
                Must contain at least one number (0-9)
              </div>
              <div
                className={`flex items-center gap-2 ${passwordChecks.uppercase ? "text-gray-600" : "text-gray-400"}`}
              >
                {passwordChecks.uppercase ? (
                  <Check size={16} />
                ) : (
                  <div className="w-4 h-4" />
                )}
                Must contain at least one uppercase letter (A-Z)
              </div>
              <div
                className={`flex items-center gap-2 ${passwordChecks.lowercase ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.lowercase ? (
                  <Check size={16} />
                ) : (
                  <div className="w-4 h-4" />
                )}
                Must contain at least one lowercase letter (a-z)
              </div>
              <div
                className={`flex items-center gap-2 ${passwordChecks.special ? "text-green-600" : "text-gray-400"}`}
              >
                {passwordChecks.special ? (
                  <Check size={16} />
                ) : (
                  <div className="w-4 h-4" />
                )}
                Must contain at least one special character (!@#$%^&*)
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <CTA name="Continue" color="blue" onClick={handleContinueClick} />
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
            className="text-red-500 font-semibold hover:underline"
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
