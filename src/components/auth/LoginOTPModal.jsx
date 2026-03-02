import { useState, useRef } from "react";
import CTA from "../CTA";
import { useVerifyLoginOTPMutation, useSendLoginOTPMutation } from "../../redux/api/authApiSlice";
import usePost from "../../hooks/usePost";
import { setOtpPending, setUserInfo } from "../../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginOTPModal() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { otpEmail } = useSelector((state) => state.app);

  const { postData: verifyLoginOTP, isLoading: isVerifying } = usePost(useVerifyLoginOTPMutation);
  const { postData: sendLoginOTP, isLoading: isResending } = usePost(useSendLoginOTPMutation);

  const handleResend = async () => {
      if (otpEmail) {
          await sendLoginOTP({ email: otpEmail }, "Verification code resent successfully!");
      }
  };

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) return;

    try {
      const response = await verifyLoginOTP({ code });
      if (response.status === 200 || response.status === true) {
        dispatch(setOtpPending({ isOtpPending: false, loginMethod: null, otpEmail: null }));
        dispatch(setUserInfo(response.data));
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "title" }}>
            Two-Step Verification
          </h2>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "body" }}>
            Please enter the 4-digit verification code sent to your registered email address
            {otpEmail && <span className="block font-semibold text-gray-700 mt-1">{otpEmail}</span>}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" style={{ fontFamily: "body" }}>
          <div className="flex justify-center gap-4">
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
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
              />
            ))}
          </div>

          <div className="pt-4">
            <CTA
              name={isVerifying ? "Verifying..." : "Verify OTP"}
              color="blue"
              className="w-full py-4 text-lg font-semibold"
              onClick={handleSubmit}
              disabled={otp.some((digit) => !digit) || isVerifying}
            />
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500" style={{ fontFamily: "body" }}>
          Didn't receive the code?{" "}
          <button
            type="button"
            className="text-blue-600 font-semibold hover:underline cursor-pointer disabled:text-gray-400"
            onClick={handleResend}
            disabled={isResending || !otpEmail}
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
}
