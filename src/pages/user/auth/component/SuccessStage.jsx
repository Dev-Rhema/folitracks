import { Download, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import CTA from "../../../../components/CTA";
import { useGetUserQRQuery } from "../../../../redux/api/authApiSlice";
import useGet from "../../../../hooks/useGet";
import SuccessCheck from "../../../../assets/svgs/SuccessCheck";

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
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="mb-5 flex flex-col items-center">
          <SuccessCheck />

          <h2
            className="text-3xl sm:text-4xl font-bold mb-3 text-center text-[#1FA750] mt-5"
            style={{ fontFamily: "title" }}
          >
            Account & QR Code Created
          </h2>
          <p
            className="text-center text-sm sm:text-base text-gray-600"
            style={{ fontFamily: "body" }}
          >
            Your account has been created successfully and your unique QR code has been automatically generated.
          </p>
        </div>

        <div className="text-center">
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
      </div>
    </div>
  );
}
