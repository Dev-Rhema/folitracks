import { Wrench } from "lucide-react";
import StatusBadge from "../../../../../components/ui/StatusBadge";
import { getServiceIcon } from "../../../../../utils/serviceUtils";
import CTA from "../../../../../components/CTA";

function InfoColumn({ label, value, sub }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function InProgressBody() {
  return (
    <div className="py-10 text-center w-full max-w-[500px] mx-auto flex flex-col items-center">
      <Wrench size={40} strokeWidth={1.5} className="text-gray-600 mb-5" />

      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-title">
        This service is currently in progress
      </h3>

      <p className="text-sm text-gray-500 mb-8">
        Update the record once maintenance is completed to keep the vehicle's
        service history accurate and up to date.
      </p>

      <CTA name="Complete Service" color="blue" className="max-w-[350px] w-full" />
    </div>
  );
}

export default function ServiceSummaryTab({ service }) {
  console.log(service);

  const isInProgress = service?.status === "In Progress";

  const serviceDate = service?.date || service?.lastServiceDate || service?.serviceDate || "—";

  const hasNextDate = service?.nextServiceDate || service?.missedServiceDate;
  const nextDateLabel = service?.missedServiceDate ? "Missed Service Date" : "Next Service Date";
  const nextDateValue = service?.missedServiceDate || service?.nextServiceDate || null;
  const nextDateSub = service?.missedServiceSub || service?.nextServiceSub || null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={getServiceIcon(service?.service || "")}
            alt={service?.service}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="text-base font-bold text-gray-900">
              {service?.service || "Service"}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {service?.serviceType || ""}
            </p>
          </div>
        </div>
        <StatusBadge status={service?.status || "Completed"} />
      </div>

      {isInProgress ? (
        <InProgressBody />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <InfoColumn
              label="Service Date"
              value={serviceDate}
            />

            {service?.serviceProvider && (
              <InfoColumn
                label="Service Provider"
                value={service.serviceProvider}
              />
            )}

            {hasNextDate && (
              <InfoColumn
                label={nextDateLabel}
                value={nextDateValue}
                sub={nextDateSub}
              />
            )}

            {service?.cost && (
              <InfoColumn label="Cost" value={service.cost} />
            )}
          </div>

          {service?.note && (
            <div>
              <p className="text-sm text-gray-400 mb-1">Note</p>
              <p className="text-sm text-gray-900 leading-relaxed">
                {service.note}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
