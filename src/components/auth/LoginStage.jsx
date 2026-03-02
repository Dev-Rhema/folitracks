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
import { useLoginWithEmailMutation, useLoginByQrUploadMutation, useSendLoginOTPMutation } from "../../redux/api/authApiSlice";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo, setOtpPending } from "../../redux/slices/appSlice";
import { convertToBase64 } from "../../utils/imageUtils";
import { useEffect, useCallback, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function LoginStage({ onContinue, onSignup }) {
  const [activeTab, setActiveTab] = useState("scan");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const qrInstanceRef = useRef(null);

  const { postData: sendLoginOTP, isLoading: isSendingOTP } = usePost(useSendLoginOTPMutation);

  const handleScanResult = useCallback(async (decodedText) => {
    try {
      const url = new URL(decodedText);
      const email = url.searchParams.get("email");

      if (email) {
        if (qrInstanceRef.current) {
          await qrInstanceRef.current.stop();
        }
        setIsScanning(false);
        const res = await sendLoginOTP({ email }, "Verification code sent to your email!");
        if (res.status === 200 || res.status == true) {
          dispatch(setOtpPending({ 
            isOtpPending: true, 
            loginMethod: "qr",
            otpEmail: email
          }));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("QR Scan Handling Error:", error);
    }
  }, [sendLoginOTP, dispatch, navigate]);

  useEffect(() => {
    if (activeTab === "scan") {
      setIsScanning(true);
    } else {
      setIsScanning(false);
    }
  }, [activeTab]);

  useEffect(() => {
    let isMounted = true;

    const startScanner = async () => {
      try {
        // Ensure div is rendered and we are in scan mode
        if (activeTab !== "scan" || !isScanning) return;

        // Wait a tick for the DOM
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const element = document.getElementById("reader");
        if (!element || !isMounted) return;

        const html5QrCode = new Html5Qrcode("reader");
        qrInstanceRef.current = html5QrCode;

        const config = { 
          fps: 10, 
          qrbox: { width: 250, height: 250 } 
        };

        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            handleScanResult(decodedText);
          },
          () => {} // ignore scan errors
        );
      } catch (err) {
        console.error("Unable to start scanner:", err);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (qrInstanceRef.current && qrInstanceRef.current.isScanning) {
        qrInstanceRef.current.stop().catch(err => console.error("Stop failed", err));
      }
    };
  }, [activeTab, isScanning, handleScanResult]);

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

  const { postData: loginWithEmail, isLoading: isLoggingIn } = usePost(useLoginWithEmailMutation);
  const { postData: loginByQrUpload, isLoading: isLoggingInByQrUpload } = usePost(useLoginByQrUploadMutation);

  const onSubmit = async (data) => {
    const res = await loginWithEmail(data);
    if (res.status === 200 || res.status == true) {
      dispatch(setUserInfo(res.data));
      navigate("/dashboard");
    }
  };

  const handleScanQR = () => {
    onContinue({ method: "scan" });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    try {
      const base64String = await convertToBase64(selectedFile);
      const res = await loginByQrUpload({ qrcode: base64String });

      if (res.status === 200 || res.status == true) {
        dispatch(setOtpPending({ 
          isOtpPending: true, 
          loginMethod: "qr",
          otpEmail: res?.data?.email || res?.email
        }));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error uploading QR code:", error);
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
          {isScanning ? (
            <div className="relative">
              <div id="reader" className="w-full bg-black rounded-xl overflow-hidden shadow-lg border-2 border-blue-100 min-h-[350px]"></div>
              <p className="text-center mt-4 text-sm text-gray-500 font-medium">
                Hold your QR code within the focus box...
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 bg-blue-50/20 rounded-xl py-16 px-6 text-center shadow-xs">
              <Camera size={48} strokeWidth={1.5} className="mx-auto mb-4 text-black" />
              <p className="text-sm sm:text-[15px] text-gray-500 max-w-xs mx-auto">
                Please allow camera access to scan QR codes for quick login
              </p>
            </div>
          )}
          <div className="pt-4">
            <CTA
              name={
                <span className="flex items-center justify-center gap-2">
                  <Camera size={20} /> {isScanning ? "Stop Scan" : "Start Scan"}
                </span>
              }
              color={isScanning ? "red" : "blue"}
              className="w-full"
              onClick={() => setIsScanning(!isScanning)}
              disabled={isSendingOTP}
            />
          </div>
        </div>
      )}

      {/* Upload QR Tab */}
      {activeTab === "upload" && (
        <div className="space-y-8" style={{ fontFamily: "body" }}>
          <input
            type="file"
            id="qr-upload"
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <label 
            htmlFor="qr-upload"
            className="border-2 border-dashed border-gray-200 bg-blue-50/20 rounded-xl py-8 px-6 text-center cursor-pointer hover:bg-blue-50/40 transition-colors relative overflow-hidden min-h-[200px] flex flex-col items-center justify-center block"
          >
            {previewUrl ? (
              <div className="w-full h-full flex flex-col items-center">
                <img 
                  src={previewUrl} 
                  alt="QR Preview" 
                  className="max-h-40 object-contain rounded-lg shadow-sm"
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center">
                <CloudUpload size={48} strokeWidth={1.5} className="mx-auto mb-4 text-black" />
                <p className="text-sm sm:text-[15px] text-gray-500">
                  <span className="text-black font-semibold underline underline-offset-4 decoration-1">Click to Upload</span>
                  {" "}or drag and drop
                </p>
              </div>
            )}
          </label>

          <div className="pt-4 w-full">
            <CTA
              name={isLoggingInByQrUpload ? "Uploading..." : "Upload File"}
              color="blue"
              className="w-full"
              onClick={() => {
                if (previewUrl) {
                  handleConfirmUpload();
                } else {
                  document.getElementById("qr-upload").click();
                }
              }}
              disabled={isLoggingInByQrUpload}
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

