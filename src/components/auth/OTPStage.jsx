import { useState, useRef } from "react";
import CTA from "../CTA";
import AuthLayout from "./AuthLayout";

export default function OTPStage({ email, onContinue, onBack, onResend }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 4) {
      onContinue({ otp: otpCode });
    }
  };

  return (
    <AuthLayout
      title="Enter Verification Code"
      subtitle={
        <>
          Enter OTP sent to your email{" "}
          <span className="font-semibold">{email}</span> to create account.
        </>
      }
      onBack={onBack}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
        style={{ fontFamily: "body" }}
      >
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 sm:w-16 sm:h-16 text-center text-xl sm:text-2xl font-semibold border-2 border-gray-300 rounded focus:outline-none focus:border-blue-900"
            />
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <CTA
            name="Continue"
            color="blue"
            className="w-full"
            onClick={handleSubmit}
            disabled={otp.some((digit) => !digit)}
          />
        </div>
      </form>

      {/* Resend OTP */}
      <p
        className="text-center mt-6 text-gray-600"
        style={{ fontFamily: "body" }}
      >
        Didn't receive OTP?{" "}
        <button
          onClick={onResend}
          className="text-red-500 font-semibold hover:underline cursor-pointer"
        >
          Resend OTP
        </button>
      </p>
    </AuthLayout>
  );
}
