import { Download, ArrowRight, CheckCircle } from "lucide-react";
import CTA from "../CTA";

export default function SuccessStage({ onDownloadQR, onContinueDashboard }) {
  // Mock QR code - in real app, generate from backend
  const qrCodeSvg = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <rect x="20" y="20" width="40" height="40" fill="black"/>
      <rect x="60" y="20" width="20" height="20" fill="black"/>
      <rect x="100" y="20" width="40" height="40" fill="black"/>
      <rect x="20" y="60" width="20" height="20" fill="black"/>
      <rect x="60" y="60" width="40" height="40" fill="black"/>
      <rect x="120" y="60" width="20" height="20" fill="black"/>
      <rect x="20" y="100" width="40" height="40" fill="black"/>
      <rect x="80" y="100" width="20" height="20" fill="black"/>
      <rect x="120" y="100" width="20" height="20" fill="black"/>
      <rect x="160" y="100" width="20" height="20" fill="black"/>
      <rect x="20" y="140" width="60" height="20" fill="black"/>
      <rect x="100" y="140" width="20" height="20" fill="black"/>
      <rect x="140" y="140" width="40" height="20" fill="black"/>
      <rect x="20" y="160" width="40" height="20" fill="black"/>
      <rect x="80" y="160" width="40" height="20" fill="black"/>
      <rect x="140" y="160" width="40" height="20" fill="black"/>
    </svg>
  `;

  const handleDownloadQR = () => {
    // In real app, download actual QR code
    onDownloadQR?.();
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <CheckCircle size={80} className="text-green-500" />
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3 text-green-600"
          style={{ fontFamily: "title" }}
        >
          Account & QR Code Created
        </h1>
        <p
          className="text-sm sm:text-base text-gray-600 mb-8"
          style={{ fontFamily: "body" }}
        >
          Your account has been created successfully and your unique QR code has
          been automatically generated.
        </p>

        {/* QR Code Display */}
        <div className="bg-gray-100 rounded p-8 mb-8 inline-block">
          <div className="w-40 h-40 bg-white rounded flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-32 h-32">
              <rect width="200" height="200" fill="white" />
              <rect x="20" y="20" width="40" height="40" fill="black" />
              <rect x="60" y="20" width="20" height="20" fill="black" />
              <rect x="100" y="20" width="40" height="40" fill="black" />
              <rect x="20" y="60" width="20" height="20" fill="black" />
              <rect x="60" y="60" width="40" height="40" fill="black" />
              <rect x="120" y="60" width="20" height="20" fill="black" />
              <rect x="20" y="100" width="40" height="40" fill="black" />
              <rect x="80" y="100" width="20" height="20" fill="black" />
              <rect x="120" y="100" width="20" height="20" fill="black" />
              <rect x="160" y="100" width="20" height="20" fill="black" />
              <rect x="20" y="140" width="60" height="20" fill="black" />
              <rect x="100" y="140" width="20" height="20" fill="black" />
              <rect x="140" y="140" width="40" height="20" fill="black" />
              <rect x="20" y="160" width="40" height="20" fill="black" />
              <rect x="80" y="160" width="40" height="20" fill="black" />
              <rect x="140" y="160" width="40" height="20" fill="black" />
            </svg>
          </div>
        </div>

        {/* Download Button */}
        <div className="mb-4">
          <CTA
            name={
              <span className="flex items-center justify-center gap-2">
                <Download size={20} /> Download QR Code
              </span>
            }
            color="blue"
            onClick={handleDownloadQR}
          />
        </div>

        {/* Continue to Dashboard Button */}
        <button
          onClick={onContinueDashboard}
          className="w-full border-2 text-white font-semibold py-3 rounded hover:opacity-90"
          style={{ backgroundColor: "var(--blue)", borderColor: "var(--blue)" }}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
