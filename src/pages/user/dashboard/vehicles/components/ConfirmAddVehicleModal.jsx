import { useState } from "react";
import { CheckCircle } from "lucide-react";
import CTA from "../../../../../components/CTA";

export default function ConfirmAddVehicle({ vehicle, onClose, onConfirm, isLoading }) {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
            <CheckCircle size={24} className="text-[#10B981]" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">
                 Add Vehicle?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Please review the details you've entered before submitting. Once added, your vehicle will be registered and linked to your account.
          </p>
          <div className="flex gap-3 justify-end">
            <CTA name="Cancel" variant="outline" color="blue" onClick={onClose}/>
            <CTA name="Add Vehicle" color="blue" isLoading={isLoading} onClick={() => {onConfirm(vehicle)}}/>
          </div>
        </div>
    </div>
  );
}
