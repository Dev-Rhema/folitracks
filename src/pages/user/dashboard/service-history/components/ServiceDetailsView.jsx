import { ArrowLeft, Bell, CalendarDays, Wrench } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../../../../../components/ui/StatusBadge";
import { getBrandLogo } from "../../../../../utils/vehicleUtils";
import { getServiceIcon } from "../../../../../utils/serviceUtils";

function InProgressBody() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
      <Wrench size={48} strokeWidth={1.5} className="text-indigo-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        This service is currently in progress
      </h2>
      <p className="text-sm text-gray-500 max-w-md">
        Your vehicle is currently undergoing maintenance. We&apos;ll update its
        service status once the work is completed.
      </p>
    </div>
  );
}

function RemindersSection({ reminders, onAdd }) {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell size={20} className="text-gray-900" strokeWidth={1.5} />
        <h3 className="text-base font-bold text-gray-900">Reminders</h3>
      </div>

      {reminders.length === 0 ? (
        <p className="text-base text-gray-900">None</p>
      ) : (
        <>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between"
              >
                <span className="text-base text-gray-900">
                  {reminder.label}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M14.707 7.293a1 1 0 01-1.414 0L10 3.914l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ))}
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 mt-4 text-(--blue) hover:opacity-70 transition cursor-pointer font-semibold text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Reminder
          </button>
        </>
      )}
    </div>
  );
}

export default function ServiceDetailsView({
  vehicle,
  service,
  onClose,
  onReschedule,
  isUpcoming = false,
  isOverdue = false,
}) {
  const status = service.status || "";
  const isInProgress = status === "In Progress";
  const isDueToday = status === "Due Today";

  // Reminders only make sense for scheduled/due-soon upcoming services
  const hasReminders = isUpcoming && !isInProgress && !isDueToday;
  const [reminders, setReminders] = useState(
    hasReminders
      ? [
        { id: 1, value: "1 day before", label: "1 day before" },
        { id: 2, value: "2 days before", label: "2 days before" },
        { id: 3, value: "5 days before", label: "5 days before" },
      ]
      : [],
  );

  const handleAddReminder = () => {
    const newId = Math.max(...reminders.map((r) => r.id), 0) + 1;
    setReminders([...reminders, { id: newId, value: "", label: "" }]);
  };

  const logo = getBrandLogo(vehicle?.make || "");
  const vehicleName = `${vehicle?.make ?? ""} ${vehicle?.vehicleModel ?? ""} ${vehicle?.yearOfManufacture ?? ""}`.trim();
  const plateNumber = vehicle?.plateNumber || "";

  return (
    <div className="w-full flex flex-col flex-1">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-900 font-bold text-2xl w-fit hover:opacity-75 transition cursor-pointer"
        >
          <ArrowLeft size={28} strokeWidth={2.5} />
          Service Details
        </button>
      </div>

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

        {!isInProgress && <button
          onClick={onReschedule}
          className="flex items-center gap-1.5 text-(--blue) hover:opacity-70 transition cursor-pointer"
        >
          <CalendarDays size={14} />
          <span className="text-sm font-semibold">Reschedule</span>
        </button>}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1 flex flex-col mt-5">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={getServiceIcon(service.service || "")}
              alt="Service"
              className="w-10 h-10 object-contain"
            />

            <div>
              <p className="text-[#04040D]">
                {service.service}
              </p>
              <p className="text-sm text-[#9E9FA3]">
                {service.serviceType || "-"}
              </p>
            </div>
          </div>

          <StatusBadge status={service.serviceStatus} />
        </div>

        {isInProgress ? (
          <InProgressBody />
        ) : (
          <div className="px-6 py-6 flex-1 flex flex-col overflow-y-auto">
            <div className="grid grid-cols-3 gap-12 mb-8">
              <div>
                <p className="text-xs text-gray-500 mb-2">{isUpcoming || isOverdue ? "Last Service Date" : "Service Date"}</p>
                <p className="text-base font-semibold text-gray-900">
                  {vehicle?.nextServiceDate?.split("T")[0] || vehicle?.lastServiceDate?.split("T")[0] || "--"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Service Provider
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {service.serviceProvider}
                </p>
              </div>

              {isDueToday && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    {isOverdue ? "Missed Service Date" : "Next Service Date"}
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {vehicle?.nextServiceDate?.split("T")[0]}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 mb-2">Cost</p>
                <p className="text-base font-semibold text-gray-900">
                  {service.cost}
                </p>
              </div>
            </div>

            {isUpcoming && !isInProgress && (
              <RemindersSection reminders={reminders} onAdd={handleAddReminder} />
            )}

            {!isUpcoming && !isOverdue && service.note && (
              <div>
                <p className="text-xs text-gray-500 mb-2">Note</p>
                <p className="text-base text-gray-900 leading-relaxed">
                  {service.note}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
