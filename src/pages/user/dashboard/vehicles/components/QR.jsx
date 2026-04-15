import { CheckCircle, Download, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Step4QR() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-4">
      <CheckCircle size={64} className="text-green-500 mb-4" strokeWidth={1.5} />
      <h2 className="text-2xl font-bold text-green-500 mb-2">
        Vehicle Added Successfully
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-8">
        The vehicle has been added successfully and all changes have been saved.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={() => navigate("/dashboard/vehicles")}
          className="w-full flex items-center justify-center gap-2 py-3 bg-(--blue) text-white rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
