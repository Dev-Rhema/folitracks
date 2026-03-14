import { HelpCircle } from "lucide-react";

export default function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-t-3xl md:rounded-2xl shadow-lg w-full md:max-w-sm md:mx-4 p-8 flex flex-col items-center text-center animate-slide-up md:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <HelpCircle size={36} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Log out?</h2>
        <p className="text-sm text-gray-500 mb-8">
          Are you sure you want to log out of your account? Your current session will be closed.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border-2 border-(--darkBlue) text-sm font-bold text-(--darkBlue) hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
