import { Camera, CloudUpload } from "lucide-react";
import { useState } from "react";
import CTA from "../CTA";
import TabNavigation from "./TabNavigation";
import FormInputField from "./FormInputField";
import PasswordInputField from "./PasswordInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchema";
import AuthLayout from "./AuthLayout";
import { useLoginWithEmailMutation } from "../../redux/api/authApiSlice";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/appSlice";

export default function LoginStage({ onContinue, onSignup }) {
  const [activeTab, setActiveTab] = useState("scan");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit: handleLoginSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const {postData: loginWithEmail, isLoading: isLoggingIn} = usePost(useLoginWithEmailMutation)

  const onSubmit = async (data) => {
   const res = await loginWithEmail(data)

   if(res.status === 200 || res.status == true){
    dispatch(setUserInfo(res.data))
    navigate("/dashboard")
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
    <AuthLayout
      title="Access Your Vehicle Profile"
      subtitle="Access your dashboard however it's most convenient for you. Scan your QR code, upload it, or sign in with your email."
    >
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
          <div className="border-2 border-dashed border-gray-200 bg-blue-50/20 rounded-xl py-16 px-6 text-center">
            <Camera size={48} strokeWidth={1.5} className="mx-auto mb-4 text-black" />
            <p className="text-sm sm:text-[15px] text-gray-500 max-w-xs mx-auto">
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
            <div className="border-2 border-dashed border-gray-200 bg-blue-50/20 rounded-xl py-16 px-6 text-center cursor-pointer hover:bg-blue-50/40 transition-colors">
              <input
                type="file"
                id="qr-upload"
                onChange={handleUploadQR}
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="qr-upload" className="cursor-pointer">
                <CloudUpload size={48} strokeWidth={1.5} className="mx-auto mb-4 text-black" />
                <p className="text-sm sm:text-[15px] text-gray-500">
                  <span className="text-black font-semibold underline underline-offset-4 decoration-1">Click to Upload</span>
                  {" "}or drag and drop
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
            onSubmit={handleLoginSubmit(onSubmit)}
            className="space-y-6"
            style={{ fontFamily: "body" }}
          >
            {/* Email */}
            <FormInputField
              label="Email Address"
              type="email"
              placeholder="youremail@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password */}
            <PasswordInputField
              label="Password"
              placeholder="••••••••••••"
              error={errors.password?.message}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register("password")}
            />

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-blue-900 font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>

            {/* Sign In Button */}
            <div className="pt-4">
              <CTA name="Sign In" color="blue" className="w-full" type="submit" disabled={isLoggingIn} />
            </div>
          </form>
        )}

      {/* Sign Up Link */}
      <p
        className="text-center mt-12 text-gray-500"
        style={{ fontFamily: "body" }}
      >
        Don't have your QR code yet?{" "}
        <button
          onClick={onSignup}
          className="text-red-600 font-bold hover:underline cursor-pointer ml-1"
        >
          Register Your Car
        </button>
      </p>
    </AuthLayout>
  );
}

