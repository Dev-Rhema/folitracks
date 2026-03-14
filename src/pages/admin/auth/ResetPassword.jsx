import { useState } from "react";
import { Check, Circle } from "lucide-react";
import CTA from "../../../components/CTA";
import FormInputField from "../../../components/FormInputField";
import PasswordInputField from "../../../components/PasswordInputField";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../../redux/api/authApiSlice";
import usePost from "../../../hooks/usePost";
import { useDispatch } from "react-redux";
import SuccessCheck from "../../../assets/svgs/SuccessCheck";
import { useNavigate } from "react-router-dom";

export default function AdminResetPassword({ }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    const [step, setStep] = useState("reset");

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
        setStep("success");
    };

    console.log(step);

    return (
        <div className="min-h-screen bg-white pt-20 pb-10">
            {step == "reset" &&
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-3xl sm:text-4xl font-bold text-center mb-3"
                        style={{ fontFamily: "title" }}
                    >
                        Reset Password
                    </h2>
                    <p
                        className="text-center text-sm sm:text-base text-gray-600 mb-8"
                        style={{ fontFamily: "body" }}
                    >
                        Enter your new password to regain access to your account.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 max-w-[480px] mx-auto"
                        style={{ fontFamily: "body" }}
                    >
                        <PasswordInputField
                            label="New Password"
                            placeholder="••••••••••••"
                            error={errors.password?.message}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            {...register("password")}
                        />

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

                        <PasswordInputField
                            label="Confirm New Password"
                            placeholder="••••••••••••"
                            error={errors.confirmPassword?.message}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            {...register("confirmPassword")}
                        />


                        <div className="pt-4">
                            <CTA
                                name={isRegistering ? "Resetting" : "Reset Password"}
                                color="blue"
                                className="w-full"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            }

            {step == "success" && <>
                <div className="mb-8 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <SuccessCheck />

                    <h2
                        className="text-3xl sm:text-4xl font-bold mb-3 text-center text-[#1FA750] mt-5"
                        style={{ fontFamily: "title" }}
                    >
                        Password Updated Successfully
                    </h2>
                    <p
                        className="text-center text-sm sm:text-base text-gray-600 mb-8"
                        style={{ fontFamily: "body" }}
                    >
                        Your password has been updated securely. You can now sign in to your account with your new password.
                    </p>

                    <CTA
                        name="Back to Sign In"
                        color="blue"
                        className="w-full max-w-[361px]"
                        onClick={() => navigate("/admin/login")}
                    />
                </div>
            </>}

        </div>
    );
}
