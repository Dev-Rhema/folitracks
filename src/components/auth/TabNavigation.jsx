export default function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mb-8 w-full max-w-xl mx-auto">
      <div
        className="flex p-1 bg-gray-100 rounded-xl w-full"
        style={{ fontFamily: "body" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-2 px-2 text-sm sm:text-[15px] font-medium transition-all duration-200 cursor-pointer rounded-lg ${
              activeTab === tab.id
                ? "text-black bg-white shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
