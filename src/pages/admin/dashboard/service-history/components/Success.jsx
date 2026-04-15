import { CheckCircle, Wrench } from "lucide-react";
import CTA from "../../../../../components/CTA";
import SuccessCheck from "../../../../../assets/svgs/SuccessCheck";

export default function Step3Success({ submittedData, onClose, onLogAnother, isEdit }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <SuccessCheck />

      <h2 className="text-2xl font-bold text-[#1FA750] mb-2 mt-5" style={{ fontFamily: "title" }}>
        {isEdit ? "Service Record Updated Successfully" : "Service Record Added Successfully"}
      </h2>
      <p className="text-sm text-gray-600 max-w-sm mb-6" style={{ fontFamily: "body" }}>
        {isEdit 
          ? "The service record has been successfully updated and the customer's history is now up to date."
          : "The service record has been successfully created and added to the vehicle's history."}
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <CTA name="Back to Service History" color="blue" className="w-full" onClick={onClose} />
        {!isEdit && (
          <CTA
            name="Log Another Service for this Vehicle"
            variant="outline"
            color="blue"
            className="w-full"
            onClick={onLogAnother}
          />
        )}
      </div>
    </div>
  );
}

