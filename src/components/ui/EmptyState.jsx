import { Inbox } from "lucide-react";

export default function EmptyState({ title, description, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-6 text-center ${className}`}>
      <div className="w-[64px] h-[64px] bg-[#F8FAFC] rounded-full flex items-center justify-center mb-2 xl:mb-6">
        <Inbox className="w-6 h-6 xl:w-8 xl:h-8 text-gray-900" strokeWidth={1.5} />
      </div>
      <h3 className="text-base xl:text-lg font-bold text-gray-900 mb-1 xl:mb-2">{title}</h3>
      <p className="text-xs xl:text-sm text-gray-500 max-w-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
