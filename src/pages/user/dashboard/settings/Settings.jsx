import { useState, useEffect } from "react";
import { Pencil, Eye, EyeOff, ArrowLeft, CheckCircle, HelpCircle } from "lucide-react";
import CTA from "../../../../components/CTA";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormInputField from "../../../../components/FormInputField";
import PasswordInputField from "../../../../components/PasswordInputField";

const ACCOUNT_TYPES = [
  "Individual Car Owner",
  "Automobile Related Business"
];


function Avatar({ name }) {
  const initials = name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative w-fit mb-6">
      <div className="w-20 h-20 rounded-full bg-[#00002b] flex items-center justify-center">
        <span className="text-white text-2xl font-bold">{initials || "U"}</span>
      </div>
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <Pencil size={12} className="text-white" strokeWidth={2.5} />
      </div>
    </div>
  );
}


function SectionTitle({ children }) {
  return (
    <h3 className="text-base font-bold text-gray-900 mb-4">{children}</h3>
  );
}


function ViewSettings({ onEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state?.app?.userInfo?.user);

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <h1 className="font-title text-[28px] font-bold text-gray-900">Settings</h1>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 text-[--blue] text-sm font-semibold hover:opacity-75 transition cursor-pointer"
          style={{ color: "var(--blue)" }}
        >
          <Pencil size={16} />
          Edit Details
        </button>
      </div>

      {/* Card */}
      <div className="border border-gray-200 rounded-2xl p-8 flex-1">
        <Avatar name={user?.fullname} />

        {/* Personal Information */}
        <SectionTitle>Personal Information</SectionTitle>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-sm text-gray-400 mb-1">Full Name</p>
            <p className="text-sm font-medium text-gray-900">{user?.fullname || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Email Address</p>
            <p className="text-sm font-medium text-gray-900">{user?.email || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Phone Number</p>
            <p className="text-sm font-medium text-gray-900">{user?.phone || "—"}</p>
          </div>
        </div>

        {/* Account Details */}
        <SectionTitle>Account Details</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-400 mb-1">Account Type</p>
            <p className="text-sm font-medium text-gray-900">{user?.accountType || "—"}</p>
            <p className="text-xs text-gray-400 italic mt-2 leading-relaxed">
              Individual accounts can register up to 10 vehicles, ideal for personal
              or family use. If you manage a fleet or multiple customer cars, switch
              to a dealer account for unlimited vehicle registrations.
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Password</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-900 tracking-widest">
                {showPassword ? "•••••••••••••" : "•••••••••••••"}
              </p>
              <button
                disabled
                className="text-gray-400 opacity-50 cursor-not-allowed"
              >
                <Eye size={18} /> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscardModal({ onStay, onExit }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <HelpCircle size={26} className="text-red-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Discard unsaved changes?
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          You have unsaved edits. Leaving this page will discard them permanently.
          Do you still want to exit?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onStay}
            className="px-8 py-3 border-2 border-(--blue) text-(--blue) rounded-xl text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onExit}
            className="px-8 py-3 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}


function EditSettings({ onCancel, onSave }) {
  const user = useSelector((state) => state?.app?.userInfo?.user);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      accountType: user?.accountType || "",
      password: "",
      confirmPassword: "",
    }
  });

  const watchPassword = watch("password");
  const passwordChanged = watchPassword?.length > 0;

  const handleCancel = () => {
    if (isDirty) setShowDiscard(true);
    else onCancel();
  };

  const onSubmit = (data) => {
    console.log("Saving settings:", data);
    onSave();
  };

  return (
    <>
      {showDiscard && (
        <DiscardModal onStay={() => setShowDiscard(false)} onExit={onCancel} />
      )}
      <div className="flex flex-col gap-5 h-full">
        {/* Page header */}
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
          Edit Settings
        </button>

        {/* Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-200 rounded-2xl p-8 flex-1">
          <Avatar name={user?.fullname} />

          {/* Personal Information */}
          <SectionTitle>Personal Information</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInputField
              label="Full Name"
              {...register("fullname", { required: "Full name is required" })}
              error={errors.fullname?.message}
            />
            <FormInputField
              label="Email Address"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              error={errors.email?.message}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FormInputField
              label="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              error={errors.phone?.message}
            />
          </div>

          {/* Account Details */}
          <SectionTitle>Account Details</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Account Type */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-medium text-gray-700">Account Type</label>
              <div className="relative">
                <select
                  {...register("accountType")}
                  className="w-full px-4 py-3 bg-[#f1f5fb] border border-gray-200 rounded-lg text-sm text-gray-800 appearance-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 cursor-pointer"
                >
                  {ACCOUNT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <PasswordInputField
              label="New Password (optional)"
              placeholder="•••••••••••••"
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register("password")}
            />
          </div>

          {/* Confirm Password — only when password is being changed */}
          {passwordChanged && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <PasswordInputField
                label="Confirm New Password"
                placeholder="•••••••••••••"
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Passwords do not match";
                    }
                  },
                })}
                error={errors.confirmPassword?.message}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <CTA name="Cancel" variant="outline" color="blue" type="button" onClick={handleCancel} />
            <CTA name="Save Changes" color="blue" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}


function SuccessSettings({ onClose }) {
  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Page header */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
        Back to Settings
      </button>

      {/* Card */}
      <div className="border border-gray-200 rounded-2xl p-8 flex-1 flex flex-col items-center justify-center">
        <CheckCircle size={72} className="text-green-500 mb-5" strokeWidth={1.5} />
        <h2 className="text-3xl font-bold text-green-500 mb-3 text-center">
          Settings Updated Successfully
        </h2>
        <p className="text-sm text-gray-400 text-center max-w-sm mb-8 leading-relaxed">
          Your changes have been saved and your account settings are now up to date.
        </p>
        <button
          onClick={onClose}
          className="w-full max-w-sm py-4 bg-(--blue) text-white rounded-xl text-sm font-semibold hover:opacity-90 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}


export default function Settings() {
  const [mode, setMode] = useState("view"); // "view" | "edit" | "success"

  if (mode === "edit") return <EditSettings onCancel={() => setMode("view")} onSave={() => setMode("success")} />;
  if (mode === "success") return <SuccessSettings onClose={() => setMode("view")} />;
  return <ViewSettings onEdit={() => setMode("edit")} />;
}
