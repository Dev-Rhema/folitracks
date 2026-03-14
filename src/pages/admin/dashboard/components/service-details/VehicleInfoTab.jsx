import { Download, Loader2 } from "lucide-react";
import useGet from "../../../../../hooks/useGet";
import useDownloadQr from "../../../../../hooks/useDownloadQr";
import { useGetUserQRQuery } from "../../../../../redux/api/authApiSlice";

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  );
}

function QRSection({ vehicle }) {
  const { data: qrData, isLoading } = useGet(useGetUserQRQuery);
  const { downloadImage, downloadPDF } = useDownloadQr();

  return (
    <div>
      <p className="text-sm text-gray-400 mb-3">QR Code</p>
      <div className="w-32 h-32 mb-4">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : qrData?.data?.base64 || qrData?.base64 ? (
          <img
            src={qrData?.data?.base64 || qrData?.base64}
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
            downloadPDF(qrData?.data?.base64 || qrData?.base64, {
              make: vehicle.make,
              model: vehicle.vehicleModel,
              plateNumber: vehicle.plateNumber,
            })
          }
          className="flex items-center gap-1.5 px-4 py-2 bg-(--blue) text-white text-xs font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          <Download size={13} />
          Download PDF
        </button>
        <button
          onClick={() =>
            downloadImage(qrData?.data?.base64 || qrData?.base64, vehicle.plateNumber)
          }
          className="flex items-center gap-1.5 px-4 py-2 border border-(--blue) text-(--blue) text-xs font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <Download size={13} />
          Download Image
        </button>
      </div>
    </div>
  );
}

export default function VehicleInfoTab({ vehicle }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Row 1: Make | Model | Year */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Make" value={vehicle.make} />
        <InfoField label="Model" value={vehicle.vehicleModel} />
        <InfoField label="Year" value={vehicle.yearOfManufacture} />
      </div>

      {/* Row 2: Plate | VIN */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Registration/Plate Number" value={vehicle.plateNumber} />
        <InfoField label="VIN" value={vehicle.vin} />
      </div>

      {/* QR Code */}
      <QRSection vehicle={vehicle} />
    </div>
  );
}
