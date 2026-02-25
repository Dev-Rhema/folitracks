import { Download, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import CTA from "../CTA";
import { useGetUserQRQuery } from "../../redux/api/authApiSlice";
import useGet from "../../hooks/useGet";
import AuthLayout from "./AuthLayout";

export default function SuccessStage({ onContinueDashboard }) {
  const { data: qrCode, loading: isLoadingQrCode } = useGet(useGetUserQRQuery);

  const handleDownloadQR = () => {
    if (!qrCode?.base64) return;
    
    const link = document.createElement("a");
    link.href = qrCode.base64;
    link.download = "folitracks-qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AuthLayout
      title="Account & QR Code Created"
      titleClassName="text-3xl sm:text-4xl font-bold mb-3 text-green-600 text-center"
      subtitle="Your account has been created successfully and your unique QR code has been automatically generated."
    >
      <div className="text-center">
        {/* <div className="mb-6 flex justify-center">
          <CheckCircle size={80} className="text-green-500" />
        </div> */}

        <div className="p-4 mb-8 inline-block">
          <div className="w-40 h-40 rounded flex items-center justify-center relative">
            {isLoadingQrCode ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-xs text-gray-500 font-medium">Generating QR...</span>
              </div>
            ) : qrCode?.base64 ? (
              <img
                src={qrCode.base64}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-xs text-gray-400 px-4">Failed to load QR code</div>
            )}
          </div>
        </div>

        <div className="max-w-[350px] mx-auto">
          <CTA
          name="Continue to Dashboard"
          color="blue"
          className="w-full mb-4"
          onClick={onContinueDashboard}
        />

        <CTA
          name={
            <span className="flex items-center justify-center gap-2">
              <Download size={20} /> Download QR Code
            </span>
          }
          color="blue"
          variant="outline"
          className="w-full"
          onClick={handleDownloadQR}
          disabled={!qrCode?.base64 || isLoadingQrCode}
        />
        </div>

      </div>
    </AuthLayout>
  );
}
