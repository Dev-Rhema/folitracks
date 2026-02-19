import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginStage from "../components/auth/LoginStage";

export default function Login() {
  const navigate = useNavigate();

  const handleLoginContinue = (data) => {
    console.log("Login attempt:", data);
    // API call to authenticate
    // After successful authentication, navigate to dashboard
    navigate("/dashboard");
  };

  const handleLoginSignup = () => {
    navigate("/sign-up");
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <LoginStage
        onContinue={handleLoginContinue}
        onSignup={handleLoginSignup}
      />
    </div>
  );
}
