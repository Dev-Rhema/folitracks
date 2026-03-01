const STATUS_STYLES = {
  Completed: "bg-teal-50 text-teal-600",
  "In Progress": "bg-purple-100 text-purple-600",
  "Due Today": "bg-orange-100 text-orange-500",
  "Due Soon": "bg-orange-50 text-orange-500",
  Scheduled: "bg-teal-50 text-teal-500",
  Overdue: "bg-red-50 text-red-500",
};

/**
 * Reusable mobile card for service history, upcoming services, and vehicles.
 *
 * Props:
 *   icon        – img src for the header icon
 *   iconBg      – Tailwind bg class for the icon circle  (default: "bg-teal-50")
 *   iconContain – use object-contain instead of object-cover (default: false)
 *   title       – bold text beside the icon
 *   status      – optional status string; renders a coloured badge when present
 *   rows        – [{ label, value, subValue? }] detail rows
 *   onViewDetails / onEdit / onRemove – optional action callbacks
 */
function ServiceHistoryCard({
  icon,
  iconBg = "bg-teal-50",
  iconContain = false,
  title,
  status,
  rows = [],
  onViewDetails,
  onEdit,
  onRemove,
}) {
  const hasActions = onViewDetails || onEdit || onRemove;

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
        {status && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
              STATUS_STYLES[status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>
        )}
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
