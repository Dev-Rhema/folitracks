import { useState, useEffect } from "react";
import { Pencil, ArrowLeft, CheckCircle, HelpCircle, QrCodeIcon, UserIcon, Download, LockIcon } from "lucide-react";
import CTA from "../../../../components/CTA";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import FormInputField from "../../../../components/FormInputField";
import SearchableSelect from "../../../../components/SearchableSelect";
import { useUpdateProfileMutation, useChangePasswordMutation } from "../../../../redux/api/authApiSlice";
import usePost from "../../../../hooks/usePost";
import { updateUserInfo } from "../../../../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import useGet from "../../../../hooks/useGet";
import { useGetUserQRQuery } from "../../../../redux/api/authApiSlice";
import useDownloadQr from "../../../../hooks/useDownloadQr";
import { toast } from "react-toastify";


function Avatar({ name }) {
  let initials;

  if (name?.split(" ").length >= 2) {
    initials = name?.split(" ")[0][0] + name?.split(" ")[1][0];
  } else {
    initials = name?.split("")[0][0];
  }

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

function ViewSettings({ onEdit }) {
  const user = useSelector((state) => state?.app?.userInfo);
  const [activeTab, setActiveTab] = useState("personal");
  const { data: qrData, loading: loadingQR } = useGet(useGetUserQRQuery, "");
  const { downloadPDF, downloadImage } = useDownloadQr()

  const TABS = [
    { key: "personal", name: "Personal Information", icon: UserIcon },
    { key: "qr", name: "QR Code", icon: QrCodeIcon },
  ];

  return (
    <div className="flex flex-col gap-5 h-full">
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

      <div className="border border-gray-200 rounded-2xl sm:p-6 p-4 flex-1">
        <div className="flex gap-4 lg:gap-8 border-b lg:border-b-0 mb-7">
          {TABS.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                }}
                className={`cursor-pointer relative font-medium flex items-center gap-1 lg:gap-2 pb-2 lg:pb-3 text-xs lg:text-base transition-colors ${isActive
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <IconComponent size={16} />

                <span>
                  {tab.name}
                </span>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-3xl bg-(--blue)" />
                )}
              </button>
            );
          })}
        </div>

        {activeTab === "personal" && (
          <>
            <Avatar name={user?.user?.fullname?.toUpperCase()} />

            <h3 className="text-base font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-sm text-gray-400 mb-1">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{user?.user?.fullname || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email Address</p>
                <p className="text-sm font-medium text-gray-900">{user?.user?.email || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{user?.user?.phone || "—"}</p>
              </div>
            </div>

            <h3 className="text-base font-bold text-gray-900 mb-4">Account Details</h3>

            <div>
              <p className="text-sm text-gray-400 mb-1">Account Type</p>
              <p className="text-sm font-medium text-gray-900">{user?.accountType || user?.user?.accountType || "—"}</p>
              <p className="text-xs text-gray-400 italic mt-2 leading-relaxed max-w-[320px]">
                Individual accounts can register up to 10 vehicles, ideal for personal
                or family use. If you manage a fleet or multiple customer cars, switch
                to a dealer account for unlimited vehicle registrations.
              </p>
            </div>
          </>
        )}

        {activeTab === "qr" && (
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4">
                {loadingQR ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                  </div>
                ) : qrData?.base64 ? (
                  <img
                    src={qrData?.base64}
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full border border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                    Not available
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() =>
                    downloadPDF(qrData?.base64, user?.user?.fullname)
                  }
                  className="flex items-center gap-1.5 px-6 py-3 bg-(--blue) text-white text-sm font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
                >
                  <Download size={13} />
                  Download as PDF
                </button>

                <button
                  onClick={() =>
                    downloadImage(qrData?.base64, user?.user?.fullname)
                  }
                  className="flex items-center gap-1.5 px-6 py-3 border border-(--blue) text-(--blue) text-sm font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  <Download size={13} />
                  Download as Image
                </button>
              </div>
            </div>
          </div>
        )}

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

  const TABS = [
    {
      key: "personal",
      name: "Personal Information",
      icon: UserIcon
    },
    {
      key: "password",
      name: "Password Change",
      icon: LockIcon
    }
  ]

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.app?.userInfo);

  const [showDiscard, setShowDiscard] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const { postData: updateProfile, isLoading: isUpdating } = usePost(useUpdateProfileMutation);
  const { postData: changePassword, isLoading: isChangingPassword } = usePost(useChangePasswordMutation);

  const { register, handleSubmit, control, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      fullname: user?.user?.fullname || "",
      email: user?.user?.email || "",
      phone: user?.user?.phone || "",
      accountType: user?.user?.accountType || user?.accountType || "",
    }
  });

  const handleCancel = () => {
    if (isDirty) setShowDiscard(true);
    else onCancel();
  };

  const onSubmit = async (data) => {
    const { email, ...rest } = data;

    const res = await updateProfile({ ...rest });
    if (res?.status == true) {
      dispatch(updateUserInfo(res?.data));
      onSave();
    }
  };


  const onChangePassword = async (data) => {
    if (data?.newPassword !== data?.confirmNewPassword) {
      toast.error("New Password and Confirm New Password do not match");
      return;
    }

    const {confirmNewPassword, oldPassword, newPassword} = data;

    const res = await changePassword({oldPassword, newPassword, confirmNewPassword});
    if (res?.status == true) {
      onSave();
    }
  };

  return (
    <>
      {showDiscard && (
        <DiscardModal onStay={() => setShowDiscard(false)} onExit={onCancel} />
      )}

      <div className="flex flex-col gap-5 h-full">
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
          Edit Settings
        </button>

        <div className="border border-gray-200 rounded-2xl sm:p-6 p-4 flex-1">
          <div className="flex gap-4 lg:gap-8 border-b lg:border-b-0 mb-7">
            {TABS.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                  }}
                  className={`cursor-pointer relative font-medium flex items-center gap-1 lg:gap-2 pb-2 lg:pb-3 text-xs lg:text-base transition-colors ${isActive
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  <IconComponent size={16} />

                  <span>
                    {tab.name}
                  </span>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-3xl bg-(--blue)" />
                  )}
                </button>
              );
            })}
          </div>

          <Avatar name={user?.user?.fullname?.toUpperCase()} />

          {activeTab === "personal" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-base font-bold text-gray-900 mb-4">Personal Information</h3>
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
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormInputField
                  label="Phone Number"
                  {...register("phone", { required: "Phone number is required" })}
                  error={errors.phone?.message}
                />
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-4">Account Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Controller
                  name="accountType"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      label="Account Type"
                      options={[
                        "Individual Car Owner",
                        "Automobile Related Business",
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select Account Type"
                      error={errors.accountType?.message}
                      searchable={false}
                    />
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <CTA name="Cancel" variant="outline" color="blue" type="button" onClick={handleCancel} />
                <CTA name="Save Changes" color="blue" type="submit" isLoading={isUpdating} />
              </div>
            </form>)}

          {activeTab === "password" && (
            <form onSubmit={handleSubmit(onChangePassword)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FormInputField
                  label="Current Password"
                  type="password"
                  {...register("oldPassword", { required: "Current password is required" })}
                  error={errors.oldPassword?.message}
                />

                <FormInputField
                  label="New Password"
                  type="password"
                  {...register("newPassword", { required: "New password is required" })}
                  error={errors.newPassword?.message}
                />

                <FormInputField
                  label="Confirm New Password"
                  type="password"
                  {...register("confirmNewPassword", { required: "Confirm new password is required" })}
                  error={errors.confirmNewPassword?.message}
                />
              </div>


              <div className="flex gap-3 mt-6">
                <CTA name="Cancel" variant="outline" color="blue" type="button" onClick={handleCancel} />
                <CTA name="Save Changes" color="blue" type="submit" isLoading={isChangingPassword} />
              </div>
            </form>
          )}
        </div>
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
  const [mode, setMode] = useState("view");

  if (mode === "edit") return <EditSettings onCancel={() => setMode("view")} onSave={() => setMode("success")} />;
  if (mode === "success") return <SuccessSettings onClose={() => setMode("view")} />;
  return <ViewSettings onEdit={() => setMode("edit")} />;
}
