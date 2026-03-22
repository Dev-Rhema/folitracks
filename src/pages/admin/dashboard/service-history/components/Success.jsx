import { CheckCircle, Wrench } from "lucide-react";
import CTA from "../../../../../components/CTA";
import SuccessCheck from "../../../../../assets/svgs/SuccessCheck";

export default function Step3Success({ submittedData, onClose, onLogAnother }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <SuccessCheck />

      <h2 className="text-2xl font-bold text-[#1FA750] mb-2 mt-5" style={{ fontFamily: "title" }}>
        Service Record Added Successfully
      </h2>
      <p className="text-sm text-gray-600 max-w-sm mb-6" style={{ fontFamily: "body" }}>
        The service record has been successfully updated and the customer's history is now up to date.
      </p>

      {/* {submittedData?.service && (
        <div className="flex items-center gap-2 border border-blue-200 bg-blue-50 rounded-lg px-4 py-2.5 mb-8 text-sm text-blue-700">
          <Wrench size={14} className="shrink-0" />
          <span>
            The next{" "}
            <span className="font-semibold text-blue-800">{submittedData.service}</span>{" "}
            is recommended in{" "}
            <span className="font-semibold text-blue-800">3 months</span>
          </span>
        </div>
      )} */}

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <CTA name="Back to Service History" color="blue" className="w-full" onClick={onClose} />
        <CTA
          name="Log Another Service for this Vehicle"
          variant="outline"
          color="blue"
          className="w-full"
          onClick={onLogAnother}
        />
      </div>
    </div>
  );
}
