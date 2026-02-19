export default function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mb-8 w-full">
      <div
        className="flex gap-0 sm:gap-0 px-2 sm:px-4 py-2 bg-gray-100 rounded-lg w-full justify-center border-b-2 border-gray-300"
        style={{ fontFamily: "body" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 sm:px-8 py-2 whitespace-nowrap text-sm sm:text-base cursor-pointer transition-colors rounded ${
              activeTab === tab.id
                ? "text-gray-900 bg-white"
                : "text-gray-400 bg-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
