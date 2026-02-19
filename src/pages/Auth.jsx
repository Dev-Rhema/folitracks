import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignupStage from "../components/auth/SignupStage";
import OTPStage from "../components/auth/OTPStage";
import VehicleRegistrationStage from "../components/auth/VehicleRegistrationStage";
import VehicleOwnershipStage from "../components/auth/VehicleOwnershipStage";
import SuccessStage from "../components/auth/SuccessStage";

export default function Auth() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState("signup"); // signup, otp, vehicle, ownership, success
  const [authData, setAuthData] = useState({});
  const [stageHistory, setStageHistory] = useState(["signup"]);

  // Handle Signup Stage
  const handleSignupContinue = (data) => {
    setAuthData((prev) => ({ ...prev, ...data }));
    setCurrentStage("otp");
    setStageHistory((prev) => [...prev, "otp"]);
  };

  const handleSignupQRClick = () => {
    navigate("/login");
  };

  // Handle OTP Stage
  const handleOTPContinue = (data) => {
    setAuthData((prev) => ({ ...prev, otp: data.otp }));
    setCurrentStage("vehicle");
    setStageHistory((prev) => [...prev, "vehicle"]);
  };

  const handleOTPBack = () => {
    setCurrentStage("signup");
    setStageHistory((prev) => prev.slice(0, -1));
  };

  const handleOTPResend = () => {
    // API call to resend OTP
    console.log("Resending OTP to:", authData.email);
  };

  // Handle Vehicle Registration Stage
  const handleVehicleContinue = (data) => {
    setAuthData((prev) => ({ ...prev, vehicle: data }));
    setCurrentStage("ownership");
    setStageHistory((prev) => [...prev, "ownership"]);
  };

  const handleVehicleBack = () => {
    setCurrentStage("otp");
    setStageHistory((prev) => prev.slice(0, -1));
  };

  // Handle Vehicle Ownership Stage
  const handleOwnershipContinue = (data) => {
    setAuthData((prev) => ({ ...prev, ownership: data }));
    setCurrentStage("success");
    setStageHistory((prev) => [...prev, "success"]);
  };

  const handleOwnershipBack = () => {
    setCurrentStage("vehicle");
    setStageHistory((prev) => prev.slice(0, -1));
  };

  // Handle Success Stage
  const handleDownloadQR = () => {
    console.log("Downloading QR code...");
    // Implement QR code download
  };

  const handleContinueDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Navbar */}
      <Navbar />

      {/* Progress line */}
      <div
        className="h-1 bg-linear-to-r from-blue-500 to-blue-900"
        style={{
          width: `${(stageHistory.length / 6) * 100}%`,
        }}
      ></div>

      {/* Stage Content */}
      <div className="flex-1">
        {currentStage === "signup" && (
          <SignupStage
            onContinue={handleSignupContinue}
            onScanQR={handleSignupQRClick}
          />
        )}

        {currentStage === "otp" && (
          <OTPStage
            email={authData.email}
            onContinue={handleOTPContinue}
            onBack={handleOTPBack}
            onResend={handleOTPResend}
          />
        )}

        {currentStage === "vehicle" && (
          <VehicleRegistrationStage
            onContinue={handleVehicleContinue}
            onBack={handleVehicleBack}
          />
        )}

        {currentStage === "ownership" && (
          <VehicleOwnershipStage
            onContinue={handleOwnershipContinue}
            onBack={handleOwnershipBack}
            fullName={authData.fullName}
          />
        )}

        {currentStage === "success" && (
          <SuccessStage
            onDownloadQR={handleDownloadQR}
            onContinueDashboard={handleContinueDashboard}
          />
        )}
      </div>
    </div>
  );
}
