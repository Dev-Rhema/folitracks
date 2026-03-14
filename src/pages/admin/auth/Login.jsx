import { useState } from "react";
import CTA from "../../../components/CTA";
import FormInputField from "../../../components/FormInputField";
import PasswordInputField from "../../../components/PasswordInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../validation/authSchema";
import { useLoginWithEmailMutation, useSendLoginOTPMutation } from "../../../redux/api/authApiSlice";
import usePost from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/slices/appSlice";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postData: sendLoginOTP, isLoading: isSendingOTP } = usePost(useSendLoginOTPMutation);

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

  const onSubmit = async (data) => {
    const res = await loginWithEmail(data);
    if (res.status === 200 || res.status == true) {
      dispatch(setUserInfo(res.data));
      navigate("/dashboard");
    }
  };

  return (

    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow max-w-[580px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="mb-8">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3 text-center text-black"
            style={{ fontFamily: "title" }}
          >
            Welcome Back Admin
          </h2>
          <p
            className="text-center text-sm sm:text-base text-gray-600"
            style={{ fontFamily: "body" }}
          >
            Access your dashboard to log services, manage records, and keep every customer’s service history up to date.
          </p>
        </div>

        <form
          onSubmit={handleLoginSubmit(onSubmit)}
          className="space-y-6 max-w-[420px] mx-auto"
          style={{ fontFamily: "body" }}
        >
          <FormInputField
            label="Email Address"
            type="email"
            placeholder="youremail@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInputField
            label="Password"
            placeholder="••••••••••••"
            error={errors.password?.message}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            {...register("password")}
          />

          <div className="text-right">
            <a href="/admin/forgot-password" className="text-blue-900 font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="">
            <CTA name="Sign In" color="blue" className="w-full" type="submit" disabled={isLoggingIn} />
          </div>
        </form>

        <p
          className="text-center mt-5 text-gray-500"
          style={{ fontFamily: "body" }}
        >
          Not an Admin?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-900 font-bold hover:underline cursor-pointer ml-1"
          >
            Scan QR Code
          </button>
        </p>
      </div>
    </div>
  );
}

