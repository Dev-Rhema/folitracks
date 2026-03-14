import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CTA from "../../../components/CTA";
import FormInputField from "../../../components/FormInputField";
import OTPInput from "../../../components/OTPInput";
import { useSendLoginOTPMutation } from "../../../redux/api/authApiSlice";
import usePost from "../../../hooks/usePost";

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export default function AdminForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState("email");
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");

    const { postData: sendLoginOTP, isLoading: isSendingOTP } = usePost(useSendLoginOTPMutation);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    const onEmailSubmit = async (data) => {
        // const res = await sendLoginOTP({ email: data.email }, "Verification code sent to your email!");
        // if (res) {
        //   setSubmittedEmail(data.email);
        //   setStep("otp");
        // }

        setSubmittedEmail(data.email);
        setStep("otp");
    };

    const onOtpSubmit = async (e) => {
        e.preventDefault();
        if (otpCode.length < 4) return;

        navigate("/admin/reset-password")
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex-grow max-w-[580px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                {step === "email" && (
                    <>
                        <div className="mb-8">
                            <h2
                                className="text-3xl sm:text-4xl font-bold mb-3 text-center text-black"
                                style={{ fontFamily: "title" }}
                            >
                                Forgot Password
                            </h2>
                            <p
                                className="text-center text-sm sm:text-base text-gray-600"
                                style={{ fontFamily: "body" }}
                            >
                                Enter the email address registered with your account to receive
                                password reset instructions.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onEmailSubmit)}
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

                            <div className="mt-8">
                                <CTA
                                    name={isSendingOTP ? "Sending..." : "Continue"}
                                    color="blue"
                                    className="w-full"
                                    type="submit"
                                    disabled={isSendingOTP}
                                />
                            </div>
                        </form>
                    </>
                )}

                {step === "otp" && (
                    <>
                        <div className="mb-8">
                            <h2
                                className="text-3xl sm:text-4xl font-bold mb-3 text-center text-black"
                                style={{ fontFamily: "title" }}
                            >
                                Enter Verification Code
                            </h2>
                            <p
                                className="text-center text-sm sm:text-base text-gray-600"
                                style={{ fontFamily: "body" }}
                            >
                                Enter OTP sent to your email <span className="font-semibold font-body">{submittedEmail}</span> to reset password.
                            </p>
                        </div>

                        <form
                            onSubmit={onOtpSubmit}
                            className="space-y-8 max-w-[420px] mx-auto"
                            style={{ fontFamily: "body" }}
                        >
                            <OTPInput onChange={setOtpCode} />

                            <div className="mt-8">
                                <CTA
                                    name="Continue"
                                    color="blue"
                                    className="w-full"
                                    type="submit"
                                    disabled={otpCode.length < 4}
                                />
                            </div>
                        </form>

                        <p className="text-center mt-6 text-sm text-gray-500" style={{ fontFamily: "body" }}>
                            Didn't receive OTP?{" "}
                            <button
                                onClick={() => sendLoginOTP({ email: submittedEmail }, "Code resent!")}
                                disabled={isSendingOTP}
                                className="text-(--blue) font-semibold hover:underline cursor-pointer disabled:text-gray-400"
                            >
                                {isSendingOTP ? "Resending OTP..." : "Resend OTP"}
                            </button>
                        </p>
                    </>
                )}

            </div>
        </div>
    );
}
