import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, Wrench, Car, User } from "lucide-react";
import { getBrandLogo } from "../../../../../utils/vehicleUtils";
import ServiceSummaryTab from "./ServiceSummaryTab";
import VehicleInfoTab from "./VehicleInfoTab";
import OwnerDetailsTab from "./OwnerDetailsTab";

const TABS = [
  { key: "summary", label: "Service Summary", icon: Wrench },
  { key: "vehicle", label: "Vehicle Info", icon: Car },
  { key: "owner", label: "Owner Details", icon: User },
];

export default function ServiceDetailsView({ vehicle, service, onClose, onEdit, onRemove }) {
  const [activeTab, setActiveTab] = useState("summary");

  const logo = getBrandLogo(vehicle?.vehicle?.make || "");
  const vehicleName = `${vehicle?.vehicle?.make ?? ""} ${vehicle?.vehicle?.vehicleModel ?? ""} ${vehicle?.vehicle?.yearOfManufacture ?? ""}`.trim();
  const plateNumber = vehicle?.vehicle?.plateNumber || "";

  return (
    <div className="flex flex-col gap-4 xl:gap-5 flex-1">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-900 font-bold text-xl xl:text-[28px] w-fit hover:opacity-75 transition cursor-pointer"
        style={{ fontFamily: "title" }}
      >
        <ArrowLeft size={24} strokeWidth={2.5} />
        Service Details
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 xl:gap-4">
          <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
            <img src={logo} alt={vehicleName} className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-base xl:text-xl font-bold text-gray-900">{vehicleName}</p>
            <p className="text-xs xl:text-sm text-gray-400 mt-0.5">{plateNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 xl:gap-6">
          <button
            onClick={() => onEdit?.(service)}
            className="flex items-center gap-1.5 text-(--blue) hover:opacity-70 transition cursor-pointer"
          >
            <Pencil size={14} />
            <span className="text-sm font-semibold">Edit Details</span>
          </button>
          <button
            onClick={() => onRemove?.(service)}
            className="flex items-center gap-1.5 text-(--red) hover:opacity-70 transition cursor-pointer"
          >
            <Trash2 size={14} />
            <span className="text-sm font-semibold">Remove Service</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 px-5 xl:px-7 py-3.5 xl:py-4 text-sm font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${active ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <Icon size={14} className="text-(--blue) shrink-0" />
                {label}
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-sm bg-(--blue)" />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 xl:px-6 py-4 xl:py-6 flex-1 overflow-y-auto">
          {activeTab === "summary" && <ServiceSummaryTab service={service} vehicle={vehicle} />}
          {activeTab === "vehicle" && <VehicleInfoTab vehicle={vehicle} />}
          {activeTab === "owner" && <OwnerDetailsTab vehicle={vehicle} />}
        </div>
      </div>
    </div>
  );
}
