import { useState } from "react";
import { HelpCircle, CheckCircle } from "lucide-react";
import usePost from "../../../../hooks/usePost";
import { useDeleteVehicleMutation } from "../../../../redux/api/vehicleApiSlice";
import CTA from "../../../../components/CTA";

export default function RemoveVehicleModal({ vehicle, onClose }) {
  const [removed, setRemoved] = useState(false);
  const { postData: deleteVehicle, isLoading } = usePost(useDeleteVehicleMutation);


  const handleRemove = async () => {
    const res = await deleteVehicle(vehicle?._id || vehicle?.id);

    if (res.status === 200) {
      setRemoved(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {removed ? (
        <div className="bg-white rounded-2xl p-10 w-full max-w-lg mx-4 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Vehicle Removed Successfully
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            {vehicle.vehicle} has been deleted from your account.
          </p>

          <CTA
            text="Close"
            onClick={onClose}
            color="blue"
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
            <HelpCircle size={26} className="text-red-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Remove this Vehicle?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            You're about to remove <strong className="text-gray-800">{vehicle.vehicle}</strong> and
            all its associated records from your account. This action cannot be
            undone. Please confirm to continue.
          </p>
          <div className="flex gap-3 justify-end">
            <CTA
              name="Cancel"
              onClick={onClose}
              color="blue"
              variant="outline"
            />

            <CTA
              name="Remove"
              onClick={handleRemove}
              color="red"
              isLoading={isLoading}

            />
          </div>
        </div>
      )}
    </div>
  );
}
