import { useState, useRef } from "react";
import StatusBadge from "../../../../../components/ui/StatusBadge";
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
import FileUploadField from "../../../../../components/FileUploadField";
import { getBrandLogo } from "../../../../../utils/vehicleUtils";
import { getServiceIcon } from "../../../../../utils/serviceUtils";
import useGet from "../../../../../hooks/useGet";
import EmptyState from "../../../../../components/ui/EmptyState";
import { useGetServiceHistoryQuery } from "../../../../../redux/api/serviceHistoryApiSlice";
import Table from "../../../../../components/ui/Table";
import Loader from "../../../../../components/ui/Loader";

const TABS = [
  { key: "basic", label: "Basic Info", icon: Car },
  { key: "owner", label: "Owner Details", icon: User },
  { key: "history", label: "Service History", icon: Key },
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


function ServiceHistoryTab({ vehicle }) {

  const [page, setPage] = useState(1);

  const { data: vehicleServiceHistory, loading: isLoadingServiceHistory } = useGet(useGetServiceHistoryQuery, { vehicle: vehicle?._id })



  const columns = [
    {
      key: "service", label: "Service", render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <img src={getServiceIcon(row.service)} alt={row.service} className="w-5 h-5" />
          </div>
          <span>{row.service}</span>
        </div>
      )
    },
    { key: "serviceType", label: "Service Type" },
    { key: "serviceDate", label: "Service Date", render: (row) => <span>{row.serviceDate?.split('T')[0]}</span> },
    { key: "nextServiceDate", label: "Next Service Date", render: (row) => <span>{row.nextServiceDate?.split('T')[0]}</span> },
    { key: "serviceStatus", label: "Status", render: (row) => <StatusBadge status={row.serviceStatus} /> },
  ];

  if (isLoadingServiceHistory) {
    return <Loader />;
  }

  return (
    <>
      {vehicleServiceHistory?.serviceHistory?.length > 0 ? (
        <Table
          columns={columns}
          data={vehicleServiceHistory?.serviceHistory || []}
          showSearch={false}
          border={false}
          searchableFields={[
            "service",
            "vehicle",
            "lastServiceDate",
            "date",
            "serviceProvider",
            "status",
            "nextServiceSub",
            "missedServiceSub",
          ]}
          totalCount={vehicleServiceHistory?.totalCount || 0}
          currentPage={page}
          onPageChange={setPage}
        />
      ) : (
        <EmptyState
          title="No Service History Found"
          description="Keep track of your car's maintenance by logging your previous or recent services here."
        />
      )}
    </>
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

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1 flex flex-col">
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

        <div className="px-5 xl:px-10 py-6 xl:py-8 flex-1 overflow-y-auto flex flex-col">
          {activeTab === "basic" && <BasicInfoTab vehicle={vehicle} />}
          {activeTab === "owner" && <OwnerDetailsTab vehicle={vehicle} />}
          {activeTab === "history" && <ServiceHistoryTab vehicle={vehicle} />}
        </div>
      </div>
    </div>
  );
}
