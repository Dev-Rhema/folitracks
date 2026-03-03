import StatusBadge from "./StatusBadge";
function ServiceHistoryCard({
  icon,
  iconBg = "bg-teal-50",
  iconContain = false,
  title,
  status,
  rows = [],
  onViewDetails,
  onSetReminder,
  onEdit,
  onRemove,
  onReschedule,
}) {
  const hasActions = onViewDetails || onSetReminder || onEdit || onRemove || onReschedule;

  return (
    <div className="bg-white border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0 overflow-hidden`}
          >
            <img
              src={icon}
              alt={title}
              className={`w-6 h-6 ${iconContain ? "object-contain" : "object-cover"}`}
            />
          </div>
          <span className="text-sm font-bold text-gray-900">{title}</span>
        </div>
        {status && <StatusBadge status={status} className="px-3 py-1 text-xs font-semibold" />}
      </div>

      {/* Detail rows */}
      {rows.length > 0 && (
        <div className="border-t divide-y">
          {rows.map((row, i) => (
            <div key={i} className="flex items-start justify-between px-4 py-3">
              <span className="text-xs text-gray-400 shrink-0">{row.label}</span>
              <div className="text-right ml-4">
                {row.value && (
                  <p className="text-xs font-semibold text-gray-900">{row.value}</p>
                )}
                {row.subValue && (
                  <p className="text-xs text-gray-400">{row.subValue}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {hasActions && (
        <div className="px-4 py-3 flex flex-col gap-2">
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="w-full border-2 border-(--darkBlue) rounded-xl py-2.5 text-sm font-bold text-(--darkBlue) hover:bg-(--darkBlue) hover:text-white transition-colors cursor-pointer"
            >
              View Details
            </button>
          )}
          {onSetReminder && (
            <button
              onClick={onSetReminder}
              className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Set Reminder
            </button>
          )}
          {onReschedule && (
            <button
              onClick={onReschedule}
              className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Reschedule
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Edit Details
            </button>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="w-full border border-red-100 rounded-xl py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ServiceHistoryCard;
