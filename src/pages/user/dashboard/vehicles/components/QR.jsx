import { CheckCircle, Download, Loader2 } from "lucide-react";

export default function Step4QR({ userQrData, isUserQrLoading, onDownloadPDF, onDownloadImage }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-4">
      <CheckCircle size={64} className="text-green-500 mb-4" strokeWidth={1.5} />
      <h2 className="text-2xl font-bold text-green-500 mb-2">
        Vehicle Added Successfully
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-8">
        Your unique QR code has been generated. Use it to access your vehicle's
        service history anytime.
      </p>

      <div className="w-40 h-40 rounded flex items-center justify-center relative mb-8">
        {isUserQrLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-xs text-gray-500 font-medium">Generating QR...</span>
          </div>
        ) : userQrData?.data?.base64 ? (
          <img
            src={userQrData?.data?.base64}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-xs text-gray-400 px-4">Failed to load QR code</div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onDownloadPDF}
          className="w-full flex items-center justify-center gap-2 py-3 bg-(--blue) text-white rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          <Download size={16} />
          Download as PDF
        </button>
        <button
          onClick={onDownloadImage}
          className="w-full flex items-center justify-center gap-2 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <Download size={16} />
          Download as Image
        </button>
      </div>
    </div>
  );
}
