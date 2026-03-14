import { useState, useRef } from "react";
import ServiceHistoryCard from "../../../../components/ui/ServiceHistoryCard";
import StatusBadge from "../../../../components/ui/StatusBadge";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Car,
  User,
  Key,
  QrCode,
  Download,
  Loader2,
} from "lucide-react";
import { useSelector } from "react-redux";
import FileUploadField from "../../../../components/FileUploadField";
import { getBrandLogo } from "../../../../utils/vehicleUtils";
import { getServiceIcon } from "../../../../utils/serviceUtils";
import { useGetUserQRQuery } from "../../../../redux/api/authApiSlice";
import useGet from "../../../../hooks/useGet";
import useDownloadQr from "../../../../hooks/useDownloadQr";
import EmptyState from "../../../../components/ui/EmptyState";

// const SERVICE_HISTORY_DATA = [
//   {
//     service: "Filter Change",
//     serviceType: "Routine Services",
//     lastDate: "31/09/2025",
//     nextDate: "31/09/2025",
//     nextSub: "Overdue by 2 weeks",
//     status: "Overdue",
//   },
//   {
//     service: "Suspension Check",
//     serviceType: "Routine Services",
//     lastDate: "31/09/2025",
//     nextDate: "31/09/2025",
//     nextSub: "Service is due today",
//     status: "In Progress",
//   },
//   {
//     service: "Battery Change",
//     serviceType: "Repair",
//     lastDate: "31/09/2025",
//     nextDate: null,
//     nextSub: null,
//     status: "Completed",
//   },
//   {
//     service: "Battery Check",
//     serviceType: "Routine Services",
//     lastDate: "31/09/2025",
//     nextDate: "31/09/2025",
//     nextSub: "Next service in 5 days",
//     status: "Due Soon",
//   },
//   {
//     service: "General Maintenance",
//     serviceType: "Routine Services",
//     lastDate: "31/09/2025",
//     nextDate: "31/09/2025",
//     nextSub: "Next service in 2 months",
//     status: "Scheduled",
//   },
//   {
//     service: "Transmission",
//     serviceType: "Repair",
//     lastDate: "31/09/2025",
//     nextDate: null,
//     nextSub: null,
//     status: "Completed",
//   },
//   {
//     service: "Radiator",
//     serviceType: "Repair",
//     lastDate: "31/09/2025",
//     nextDate: null,
//     nextSub: null,
//     status: "Completed",
//   },
//   {
//     service: "Electrical/Lighting",
//     serviceType: "Repair",
//     lastDate: "31/09/2025",
//     nextDate: null,
//     nextSub: null,
//     status: "Completed",
//   },
//   {
//     service: "Body Work",
//     serviceType: "Repair",
//     lastDate: "31/09/2025",
//     nextDate: null,
//     nextSub: null,
//     status: "Completed",
//   },
//   {
//     service: "Brake Inspection",
//     serviceType: "Routine Services",
//     lastDate: "31/09/2025",
//     nextDate: "31/09/2025",
//     nextSub: "Next service in 2 weeks",
//     status: "Scheduled",
//   },
//   {
//     service: "Oil Change",
//     serviceType: "Routine Services",
//     lastDate: "31/09/2025",
//     nextDate: "31/09/2025",
//     nextSub: "Next service in 1 month",
//     status: "Scheduled",
//   },
// ];

const SERVICE_HISTORY_DATA = []

const TABS = [
  { key: "basic", label: "Basic Info", icon: Car },
  { key: "owner", label: "Owner Details", icon: User },
  { key: "history", label: "Service History", icon: Key },
  { key: "qr", label: "QR Code", icon: QrCode },
];


function BasicInfoTab({ vehicle }) {
  const fields = [
    { label: "Make", value: vehicle.make },
    { label: "Model", value: vehicle.vehicleModel },
    { label: "Year", value: vehicle.yearOfManufacture },
    { label: "Registration/Plate Number", value: vehicle.plateNumber },
    { label: "VIN", value: vehicle.vin },
  ];

  return (
    <>
      <div className="md:hidden flex flex-col divide-y py-1">
        {fields.map(({ label, value }) => (
          <div key={label} className="py-4">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <p className="text-base font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:flex flex-col gap-10 py-2">
        <div className="grid grid-cols-3">
          <div>
            <p className="text-sm text-gray-400 mb-1">Make</p>
            <p className="text-[15px] font-semibold text-gray-900">{vehicle.make}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Model</p>
            <p className="text-[15px] font-semibold text-gray-900">{vehicle.vehicleModel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Year</p>
            <p className="text-[15px] font-semibold text-gray-900">{vehicle.yearOfManufacture}</p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              Registration/Plate Number
            </p>
            <p className="text-[15px] font-semibold text-gray-900">
              {vehicle.plateNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">VIN</p>
            <p className="text-[15px] font-semibold text-gray-900">{vehicle.vin}</p>
          </div>
        </div>
      </div>
    </>
  );
}


function OwnerDetailsTab({ vehicle }) {
  const userInfo = useSelector((state) => state.app.userInfo);

  return (
    <div className="flex flex-col gap-6 xl:gap-8">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="">
          <p className="text-sm text-gray-400 mb-1">Owner</p>
          <p className="text-base xl:text-[15px] font-semibold text-gray-900">
            {vehicle.fullName || vehicle.businessName || userInfo?.fullname || "—"}
          </p>
        </div>

        <div className="">
          <p className="text-sm text-gray-400 mb-1">Account Type</p>
          <p className="text-base xl:text-[15px] font-semibold text-gray-900">
            {vehicle.accountType || "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FileUploadField
          label="Vehicle Registration Document"
          fieldId="ownerRegDoc"
          fileName={vehicle.vehicleRegistrationDocument?.split("/").pop()}
          isPreviewOnly
          previewUrl={vehicle.vehicleRegistrationDocument}

        />

        <FileUploadField
          label={vehicle.driverLicense ? "Driver's License" : "Business License"}
          fieldId="ownerIdentityDoc"
          fileName={(vehicle.driverLicense || vehicle.businessLicense)?.split("/").pop()}
          isPreviewOnly
          previewUrl={vehicle.driverLicense || vehicle.businessLicense}
        />
      </div>
    </div>
  );
}


function ServiceHistoryTab() {
  const HEADERS = [
    "Service",
    "Service Type",
    "Last Service Date",
    "Next Service Date",
    "Status",
  ];

  return (
    <>
      <div className="md:hidden space-y-3">
        {SERVICE_HISTORY_DATA.map((row, i) => (
          <ServiceHistoryCard
            key={i}
            title={row.service}
            status={row.status}
            rows={[
              { label: "Service Type", value: row.serviceType },
              { label: "Last Service Date", value: row.lastDate },
              {
                label: "Next Service Date",
                value: row.nextDate || "--",
                subValue: row.nextSub,
              },
            ]}
          />
        ))}
        {SERVICE_HISTORY_DATA.length === 0 && (
          <EmptyState
            title="No Service History Found"
            description="Keep track of your car's maintenance by logging your previous or recent services here."
          />
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-0">
          <thead>
            <tr className="border-b border-gray-100">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="text-left text-sm font-semibold text-[#3B82F6] px-4  py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICE_HISTORY_DATA.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className=" py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={getServiceIcon(row.service)}
                      alt={row.service}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {row.service}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {row.serviceType}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                  {row.lastDate}
                </td>
                <td className="px-4 py-3">
                  {row.nextDate ? (
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        {row.nextDate}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {row.nextSub}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">--</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
            {SERVICE_HISTORY_DATA.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4">
                  <EmptyState
                    title="No Service History Found"
                    description="Keep track of your car's maintenance by logging your previous or recent services here."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}


function QRCodeTab({ vehicle }) {
  const { data: userQrData, isLoading: isUserQrLoading, refetch: refetchQr } = useGet(useGetUserQRQuery);
  const { downloadImage, downloadPDF } = useDownloadQr();

  const handleDownloadImage = () => {
    downloadImage(userQrData?.base64, vehicle.plateNumber);
  };

  const handleDownloadPDF = () => {
    downloadPDF(userQrData?.base64, {
      make: vehicle.make,
      model: vehicle.vehicleModel,
      plateNumber: vehicle.plateNumber,
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="w-40 h-40 rounded flex items-center justify-center relative">
        {isUserQrLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-xs text-gray-500 font-medium">Generating QR...</span>
          </div>
        ) : userQrData?.base64 ? (
          <img
            src={userQrData?.base64}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-xs text-gray-400 px-4">Failed to load QR code</div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleDownloadPDF}
          className="w-full flex items-center justify-center gap-2 py-3 bg-(--blue) text-white rounded-md text-sm font-medium hover:opacity-90 transition cursor-pointer"
        >
          <Download size={16} />
          Download as PDF
        </button>

        <button
          onClick={handleDownloadImage}
          className="w-full flex items-center justify-center gap-2 py-3 border border-(--blue) text-(--blue) rounded-md text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          <Download size={16} />
          Download as Image
        </button>
      </div>
    </div>
  );
}


export default function VehicleDetails({ vehicle, onClose, onEdit, onRemove }) {
  const [activeTab, setActiveTab] = useState("basic");
  const logo = getBrandLogo(vehicle.make);

  return (
    <div className="flex flex-col gap-4 xl:gap-5 flex-1">
      {/* Page header */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-xl xl:text-[28px] w-fit hover:opacity-75 transition cursor-pointer font-[title]"
      >
        <ArrowLeft size={22} strokeWidth={2.5} className="md:hidden" />
        <ArrowLeft size={28} strokeWidth={2.5} className="hidden md:block" />
        Vehicle Details
      </button>

      {/* Vehicle identity row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 xl:gap-4">
          <div className="w-12 h-12 xl:w-15 xl:h-15 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={logo}
              alt={vehicle.make}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-base xl:text-xl font-bold text-gray-900">
              {`${vehicle.make} ${vehicle.vehicleModel} ${vehicle.yearOfManufacture}`}
            </p>
            <p className="text-xs xl:text-sm text-gray-400 mt-0.5">
              {vehicle.plateNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 xl:gap-6">
          <button
            onClick={() => onEdit?.(vehicle)}
            className="flex items-center gap-2 text-(--blue) hover:opacity-70 transition cursor-pointer"
          >
            <Pencil size={15} />
            <span className="text-sm font-semibold">Edit Details</span>
          </button>
          <button
            onClick={() => onRemove?.(vehicle)}
            className="flex items-center gap-2 text-(--red) hover:opacity-70 transition cursor-pointer"
          >
            <Trash2 size={15} />
            <span className="text-sm font-semibold">Remove Vehicle</span>
          </button>
        </div>
      </div>

      {/* Tabbed card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1">
        {/* Tab bar */}
        <div className="flex border-b px-4 border-gray-100  overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-1.5 xl:gap-2 px-3 xl:px-5 py-3 xl:py-4 text-xs xl:text-sm font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <Icon
                  size={14}
                  className={active ? "text-(--blue)" : "text-gray-400"}
                />
                {label}
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-4xl bg-(--blue)" />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-5 xl:px-10 py-6 xl:py-8 flex-1 overflow-y-auto">
          {activeTab === "basic" && <BasicInfoTab vehicle={vehicle} />}
          {activeTab === "owner" && <OwnerDetailsTab vehicle={vehicle} />}
          {activeTab === "history" && <ServiceHistoryTab />}
          {activeTab === "qr" && <QRCodeTab vehicle={vehicle} />}
        </div>
      </div>
    </div>
  );
}
