const STATUS_STYLES = {
  "In Progress": "bg-[#E6E6F7] text-[#7C3AED]",
  "Due Today": "bg-[#FFF2E8] text-[#F9A825]",
  "Due Soon": "bg-[#FFF2E8] text-[#8A6906]",
  Scheduled: "bg-[#E6F7F7] text-[#007BFF]",
  Overdue: "bg-[#FDEEEF] text-[#DC3545]",
  Completed: "bg-[#E6F7F7] text-[#28A745]",
};

export default function StatusBadge({ status, className = "px-4 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-medium" }) {
  return (
    <span
      className={`rounded-full whitespace-nowrap ${STATUS_STYLES[status] || "bg-gray-100 text-gray-600"} ${className}`}
    >
      {status}
    </span>
  );
}
