import { useState } from "react";
import { CheckSquare, Clock, AlertTriangle } from "lucide-react";
import DashHeader from "../components/DashHeader";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../../../../components/ui/FilterDropdown";
import Loader from "../../../../components/ui/Loader";
import usePost from "../../../../hooks/usePost";
import { useAdminChangeServiceStatusMutation } from "../../../../redux/api/serviceHistoryApiSlice";
import ServiceDetailsView from "./components/ServiceDetailsView";
import CompletedServices, { COMPLETED_FILTER_CATEGORIES } from "./components/CompletedServices";
import UpcomingServices, { UPCOMING_FILTER_CATEGORIES } from "./components/UpcomingServices";
import OverdueServices, { OVERDUE_FILTER_CATEGORIES } from "./components/OverdueServices";

function ServiceHistory({ onEditLog, onRemoveLog }) {
  const [activeTab, setActiveTab] = useState("completed");
  const [counts, setCounts] = useState({ completed: 0, upcoming: 0, overdue: 0 });
  const [searchTerms, setSearchTerms] = useState({ completed: "", upcoming: "", overdue: "" });
  const [filterValues, setFilterValues] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rescheduleRow, setRescheduleRow] = useState(null);
  const [pages, setPages] = useState({ completed: 1, upcoming: 1, overdue: 1 });

  const { postData: changeServiceStatus, isLoading: loadingChangeServiceStatus } = usePost(useAdminChangeServiceStatusMutation)

  const TABS = [
    { name: "Completed", count: counts.completed, key: "completed", icon: CheckSquare },
    { name: "Upcoming", count: counts.upcoming, key: "upcoming", icon: Clock },
    { name: "Overdue", count: counts.overdue, key: "overdue", icon: AlertTriangle },
  ];

  const updateCount = (key, count) => {
    setCounts(prev => ({ ...prev, [key]: count }));
  };

  const handleFilterChange = (category, value) => {
    setFilterValues((prev) => ({ ...prev, [category]: value }));
  };

  const handleActionClick = (row, action) => {
    if (action === "view") {
      setSelectedVehicle(row);
      setSelectedService(row);
    } else if (action === "reschedule") {
      setRescheduleRow(row);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await changeServiceStatus({ id, body: { serviceStatus: status } });
    } catch (error) {
      console.error("Status change error:", error);
    }
  };

  if (loadingChangeServiceStatus) {
    return <Loader />
  }

  const renderActiveServices = () => {
    const commonProps = {
      page: pages[activeTab],
      setPage: (p) => setPages(prev => ({ ...prev, [activeTab]: p })),
      searchTerm: searchTerms[activeTab],
      handleActionClick,
      onEditLog,
      filterValues,
      onCountUpdate: (count) => updateCount(activeTab, count),
    };

    switch (activeTab) {
      case "upcoming":
        return <UpcomingServices handleStatusChange={handleStatusChange} {...commonProps} />;
      case "overdue":
        return <OverdueServices {...commonProps} />;
      default:
        return <CompletedServices {...commonProps} />;
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {selectedService && selectedVehicle ? (
        <div className="flex-1 flex flex-col">
          <ServiceDetailsView
            vehicle={selectedVehicle}
            service={selectedService}
            onClose={() => {
              setSelectedService(null);
              setSelectedVehicle(null);
            }}
            onEdit={(data) => {
              setSelectedService(null);
              setSelectedVehicle(null);
              onEditLog(data);
            }}
            isUpcoming={activeTab === "upcoming"}
            isOverdue={activeTab === "overdue"}
          />
        </div>
      ) : (
        <>
          <DashHeader title="Service History" />

          <div className="bg-white p-3 lg:p-4 rounded-2xl flex flex-col gap-3 lg:gap-4">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-0 border-b max-lg:border-b-0">
              <div className="flex gap-4 lg:gap-8 border-b lg:border-b-0">
                {TABS.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        // Optionally preserve search term instead of clearing
                      }}
                      className={`cursor-pointer relative font-medium flex items-center gap-1 lg:gap-2 pb-2 lg:pb-3 text-xs lg:text-base transition-colors ${isActive
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      <IconComponent size={16} />
                      <span>
                        {tab.name} ({tab.count})
                      </span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-3xl bg-(--blue)" />
                      )}
                    </button>
                  );
                })}
              </div>
 
              <div className="flex items-center justify-end gap-2 lg:gap-3 lg:pb-3 mt-3">
                <SearchBar
                  placeholder="Search..."
                  value={searchTerms[activeTab]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerms(prev => ({ ...prev, [activeTab]: value }));
                    setPages(prev => ({ ...prev, [activeTab]: 1 }));
                  }}
                  className="w-55 xl:w-75"
                />
                <FilterDropdown
                  categories={
                    activeTab === "completed"
                      ? COMPLETED_FILTER_CATEGORIES
                      : activeTab === "upcoming"
                        ? UPCOMING_FILTER_CATEGORIES
                        : OVERDUE_FILTER_CATEGORIES
                  }
                  values={filterValues}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {renderActiveServices()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceHistory;
