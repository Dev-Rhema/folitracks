import { useState } from "react";
import CTA from "../../../../components/CTA";
import OTPInput from "../../../../components/OTPInput";
import { useVerifyUserEmailMutation } from "../../../../redux/api/authApiSlice";
import usePost from "../../../../hooks/usePost";
import { setUserInfo } from "../../../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import AuthLayout from "../AuthLayout";

export default function OTPStage({ email, onContinue, onBack, onResend }) {
  const dispatch = useDispatch();
  const [otpCode, setOtpCode] = useState("");

  const { postData: verifyUserEmail, isLoading: isVerifying } = usePost(useVerifyUserEmailMutation);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (otpCode.length < 4) return;

    const response = await verifyUserEmail({ code: otpCode });
    if (response) {
      dispatch(
        setUserInfo({
          authResponse: {
            accessToken: response?.token || response?.data?.token,
          },
        })
      );
      onContinue(response);
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
      <form onSubmit={handleSubmit} className="space-y-8" style={{ fontFamily: "body" }}>
        <OTPInput onChange={setOtpCode} />

        <div className="pt-4">
          <CTA
            name={isVerifying ? "Verifying..." : "Continue"}
            color="blue"
            className="w-full"
            onClick={handleSubmit}
            disabled={otpCode.length < 4 || isVerifying}
          />
        </div>
      </form>

      <p className="text-center mt-6 text-gray-600" style={{ fontFamily: "body" }}>
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
