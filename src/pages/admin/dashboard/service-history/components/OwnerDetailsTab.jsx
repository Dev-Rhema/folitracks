import { Download, Loader2 } from "lucide-react";
import { useAdminGetUserQRQuery } from "../../../../../redux/api/authApiSlice";
import useGet from "../../../../../hooks/useGet";
import useDownloadQr from "../../../../../hooks/useDownloadQr";
import CTA from "../../../../../components/CTA";

export default function OwnerDetailsTab({ vehicle }) {
  const { data: qrData, loading: loadingQR } = useGet(useAdminGetUserQRQuery, vehicle?.user[0]?._id);
  const { downloadPDF, downloadImage } = useDownloadQr()

  const ownerName = vehicle?.vehicle?.fullName || vehicle?.vehicle?.businessName || "—";
  const registeredVehicles = vehicle?.registeredVehicles ?? vehicle?.vehicleCount ?? "—";
  const otherVehicles = vehicle?.otherVehicles || [];

  function InfoField({ label, value }) {
    return (
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField
          label={vehicle?.vehicle?.businessName ? "Business Name" : "Owner Name"}
          value={ownerName}
        />
        <InfoField label="Account Type" value={vehicle?.vehicle?.accountType} />
        <InfoField label="Email Address" value={vehicle?.user[0]?.email} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Phone Number" value={vehicle?.user[0]?.phone} />
        <InfoField label="Registered Vehicles" value={registeredVehicles} />
      </div>

      {otherVehicles.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-3">Other Vehicles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherVehicles.map((v, i) => (
              <p key={i} className="text-sm text-gray-700">
                {v}
              </p>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm text-gray-400 mb-3">QR Code</p>
        <div className="w-32 h-32 mb-4">
          {loadingQR ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : qrData ? (
            <img
              src={qrData || qrData?.base64}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full border border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
              Not available
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              downloadPDF(qrData, ownerName)
            }
            className="flex items-center gap-1.5 px-6 py-3 bg-(--blue) text-white text-sm font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
          >
            <Download size={13} />
            Download PDF
          </button>

          <button
            onClick={() =>
              downloadImage(qrData, ownerName)
            }
            className="flex items-center gap-1.5 px-6 py-3 border border-(--blue) text-(--blue) text-sm font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            <Download size={13} />
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
}
