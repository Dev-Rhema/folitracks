import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import SignupStage from "../components/auth/SignupStage";
import OTPStage from "../components/auth/OTPStage";
import VehicleRegistrationStage from "../components/auth/VehicleRegistrationStage";
import VehicleOwnershipStage from "../components/auth/VehicleOwnershipStage";
import SuccessStage from "../components/auth/SuccessStage";

const URL_STAGES = ["vehicle", "ownership", "success"];
const ALL_STAGES = ["signup", "otp", "vehicle", "ownership", "success"];

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInfo } = useSelector((state) => state.app);
  const [authData, setAuthData] = useState({});


  const stepFromUrl = searchParams.get("step");
  const currentStage = URL_STAGES.includes(stepFromUrl) ? stepFromUrl : stepFromUrl === "otp" ? "otp" : "signup";

  const goToUrlStep = (step) => setSearchParams({ step });

  const stageIndex = ALL_STAGES.indexOf(currentStage);

  // ── Signup ──────────────────────────────────────────────
  const handleSignupContinue = (data) => {
    setAuthData((prev) => ({ ...prev, ...data }));
    setSearchParams({ step: "otp" });
  };

  const handleSignupQRClick = () => navigate("/login");

  // ── OTP ─────────────────────────────────────────────────
  const handleOTPContinue = (data) => {
    setAuthData((prev) => ({ ...prev, ...data }));
    // From here on, the step is in the URL so refresh is safe
    goToUrlStep("vehicle");
  };

  const handleOTPBack = () => setSearchParams({});   // back to signup (no param)

  const handleOTPResend = () => {
    console.log("Resending OTP to:", authData.email);
  };

  const handleVehicleContinue = (data) => {
    setAuthData((prev) => ({ ...prev, vehicle: data }));
    goToUrlStep("ownership");
  };

  const handleVehicleBack = (data) => {
    if (data) setAuthData((prev) => ({ ...prev, vehicle: data }));
    setSearchParams({ step: "otp" });
  };

  const handleOwnershipContinue = (data) => {
    setAuthData((prev) => ({ ...prev, ownership: data }));
    goToUrlStep("success");
  };

  const handleOwnershipBack = (data) => {
    if (data) setAuthData((prev) => ({ ...prev, ownership: data }));
    goToUrlStep("vehicle");
  };

  const handleDownloadQR = () => console.log("Downloading QR code...");
  const handleContinueDashboard = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-white pt-3">
      <Navbar />

      {/* Progress line driven by stage index */}
      <div
        className="h-1 bg-linear-to-r from-blue-500 to-blue-900 transition-all duration-300"
        style={{ width: `${((stageIndex + 1) / ALL_STAGES.length) * 100}%` }}
      />

      <div className="flex-1">
        {currentStage === "signup" && (
          <SignupStage
            onContinue={handleSignupContinue}
            onScanQR={handleSignupQRClick}
            defaultValues={authData}
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
            defaultValues={authData.vehicle}
          />
        )}

        {currentStage === "ownership" && (
          <VehicleOwnershipStage
            onContinue={handleOwnershipContinue}
            onBack={handleOwnershipBack}
            fullName={userInfo?.fullname || ""}
            vehicleData={authData.vehicle}
            defaultValues={authData.ownership}
          />
        )}

        {currentStage === "success" && (
          <SuccessStage
            onContinueDashboard={handleContinueDashboard}
          />
        )}
      </div>
    </div>
  );
}
