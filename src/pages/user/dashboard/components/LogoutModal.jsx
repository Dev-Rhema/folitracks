import { HelpCircle } from "lucide-react";
import { useLogoutUserMutation } from "../../../../redux/api/authApiSlice";
import usePost from "../../../../hooks/usePost";
import CTA from "../../../../components/CTA";
import { useDispatch } from "react-redux";
import { logOut } from "../../../../redux/slices/appSlice";

export default function LogoutModal({ onCancel }) {
  const dispatch = useDispatch();
  const { postData: logout, isLoading } = usePost(useLogoutUserMutation);

  const handleLogout = async () => {
    const res = await logout();
    if (res.status) {
      dispatch(logOut());
    }
    onCancel();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <HelpCircle size={26} className="text-red-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Log out?
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Are you sure you want to log out of your account? Your current session will be closed.
        </p>
        
        <div className="flex gap-3 justify-end">
          <CTA
            name="Cancel"
            onClick={onCancel}
            color="blue"
            variant="outline"
          />

          <CTA
            name="Logout"
            onClick={handleLogout}
            color="red"
            isLoading={isLoading}

          />
        </div>
      </div>
    </div>
  );
}
