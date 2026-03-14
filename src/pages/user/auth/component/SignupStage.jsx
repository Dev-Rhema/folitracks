import { useState } from "react";
import { Check, Circle } from "lucide-react";
import CTA from "../../../../components/CTA";
import FormInputField from "../../../../components/FormInputField";
import PasswordInputField from "../../../../components/PasswordInputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../../validation/authSchema";
import { useRegisterUserMutation } from "../../../../redux/api/authApiSlice";
import usePost from "../../../../hooks/usePost";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../../redux/slices/appSlice";

export default function SignupStage({ onContinue, onScanQR, defaultValues }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "all",
    defaultValues: {
      fullname: defaultValues?.fullname || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      password: defaultValues?.password || "",
    },
  });

  const { postData: registerUser, isLoading: isRegistering } = usePost(useRegisterUserMutation);

  const password = watch("password", "");
  const [showPassword, setShowPassword] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const onSubmit = async (data) => {
    const response = await registerUser(data);

    if (response) {
      dispatch(setUserInfo({ fullname: data.fullname }));
      onContinue(response);
    }

  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-3"
          style={{ fontFamily: "title" }}
        >
          Welcome to Folitracks
        </h2>
        <p
          className="text-center text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Set up your account in seconds to securely manage your vehicles.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          style={{ fontFamily: "body" }}
        >
          {/* Full Name */}
          <FormInputField
            label="Full Name"
            placeholder="Obafemi Martins"
            error={errors.fullname?.message}
            {...register("fullname")}
          />

          {/* Email */}
          <FormInputField
            label="Email Address"
            type="email"
            placeholder="youremail@example.com"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Phone */}
          <FormInputField
            label="Phone Number"
            type="tel"
            placeholder="+234 912 653 1214"
            error={errors.phone?.message}
            {...register("phone")}
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

          {/* Password Requirements */}
          <div
            className="mt-4 space-y-2 text-xs sm:text-sm"
            style={{ fontFamily: "body" }}
          >
            <div className="flex items-center gap-2">
              {passwordChecks.length ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.length ? "text-gray-600" : "text-gray-400"
                }
              >
                Must be at least 8 characters long
              </span>
            </div>

            <div className="flex items-center gap-2">
              {passwordChecks.number ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.number ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one number (0-9)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {passwordChecks.uppercase ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.uppercase ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one uppercase letter (A-Z)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordChecks.lowercase ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.lowercase ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one lowercase letter (a-z)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {passwordChecks.special ? (
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              ) : (
                <Circle size={16} className="text-gray-400" />
              )}
              <span
                className={
                  passwordChecks.special ? "text-gray-600" : "text-gray-400"
                }
              >
                Must contain at least one special character (!@#$%^&*)
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button type="submit" className="w-full" disabled={isRegistering}>
              <CTA
                name={isRegistering ? "Creating Account..." : "Continue"}
                color="blue"
                className="w-full"
              />
            </button>
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
            className="text-red-500 font-semibold hover:underline cursor-pointer"
          >
            Scan QR Code
          </button>
        </p>

        {/* Footer */}
        <p
          className="text-center text-sm text-gray-600 mt-6"
          style={{ fontFamily: "body" }}
        >
          By clicking Continue to create an account, I agree that I have read
          and accepted the{" "}
          <a
            href="/terms"
            className="text-blue-900 underline font-bold hover:underline"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="/policy"
            className="text-blue-900 underline font-bold hover:underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
