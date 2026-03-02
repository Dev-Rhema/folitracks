const STATUS_STYLES = {
  "In Progress": "bg-purple-100 text-purple-600",
  "Due Today": "bg-orange-100 text-orange-500",
  "Due Soon": "bg-orange-50 text-orange-500",
  Scheduled: "bg-teal-50 text-teal-500",
  Overdue: "bg-red-50 text-red-500",
  Completed: "bg-teal-50 text-teal-600",
};

export default function StatusBadge({ status, className = "px-4 py-1.5 text-sm font-medium" }) {
  return (
    <span
      className={`rounded-full whitespace-nowrap ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600"} ${className}`}
    >
      {status}
    </span>
  );
}
