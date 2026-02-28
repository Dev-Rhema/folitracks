import { useState } from "react";
import { imageUrls } from "../../config/imageUrls";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import CTA from "../CTA";
import { Bell } from "lucide-react";
import Vehicles from "./Vehicles";
import Dashboard from "./Dashboard";
import ServiceHistory from "./ServiceHistory";
import Settings from "./Settings";
import AddVehicleForm from "./AddVehicleForm";
import EditVehicleForm from "./EditVehicleForm";
import RemoveVehicleModal from "./RemoveVehicleModal";

const DASHNAVS = [
  { id: 1, name: "Dashboard" },
  { id: 2, name: "Vehicles" },
  { id: 3, name: "Service History" },
  { id: 4, name: "Settings" },
];

function DashNav({ currentPath }) {
  const getNavPath = (name) => {
    const pathMap = {
      Dashboard: "/dashboard",
      Vehicles: "/dashboard/vehicles",
      "Service History": "/dashboard/service-history",
      Settings: "/dashboard/settings",
    };
    return pathMap[name] || "/dashboard";
  };

  return (
    <div className="w-75 bg-white h-screen flex flex-col justify-between py-6 border-r fixed z-1">
      <div className="flex flex-col gap-10">
        <div className="pl-6">
          <img src={imageUrls.logo} alt="" />
        </div>
        <div className="pl-6 flex flex-col gap-10">
          {DASHNAVS.map((dashNavItem) => {
            const navPath = getNavPath(dashNavItem.name);
            const isActive = currentPath === navPath;
            return (
              <Link
                key={dashNavItem.id}
                to={navPath}
                className={`text-left cursor-pointer ${isActive ? "font-bold text-blue-600" : ""}`}
              >
                <p>{dashNavItem.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <p className="text-(--red) pl-6 cursor-pointer">Log Out</p>
    </div>
  );
}

function TopDash({ onAddVehicle }) {
  return (
    <div className="w-full bg-white border-b pl-75 fixed top-0 left-0 z-10">
      <div className="flex justify-between px-4 py-2">
        <SearchBar placeholder="search" className="" />
        <div className="flex gap-6 items-center">
          <CTA
            name="+ &nbsp; Add Vehicle"
            color="blue"
            onClick={onAddVehicle}
          />
          <div className="bg-[#EEF1F8] w-12 h-12 flex items-center justify-center text-center rounded-full cursor-pointer">
            <Bell />
          </div>
          <span className="w-12 h-12 flex items-center justify-center text-center bg-(--darkBlue) rounded-full">
            <p className="text-xl text-white">CE</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const location = useLocation();
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);
  const [removeVehicle, setRemoveVehicle] = useState(null);
  const [extraVehicles, setExtraVehicles] = useState([]);
  const [removedRegistrations, setRemovedRegistrations] = useState([]);

  const handleVehicleAdded = (vehicleData) => {
    setExtraVehicles((prev) => [vehicleData, ...prev]);
  };

  const handleVehicleRemoved = (vehicle) => {
    setRemovedRegistrations((prev) => [...prev, vehicle.registrationNumber]);
    setExtraVehicles((prev) =>
      prev.filter((v) => v.registrationNumber !== vehicle.registrationNumber)
    );
  };

  const handleActionClick = (row, action) => {
    if (action === "edit") setEditVehicle(row);
    if (action === "remove") setRemoveVehicle(row);
  };

  const renderComponent = () => {
    if (showAddVehicle) {
      return (
        <AddVehicleForm
          onClose={() => setShowAddVehicle(false)}
          onVehicleAdded={(v) => {
            handleVehicleAdded(v);
          }}
        />
      );
    }

    if (editVehicle) {
      return (
        <EditVehicleForm
          vehicle={editVehicle}
          onClose={() => setEditVehicle(null)}
        />
      );
    }

    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/") {
      return <Dashboard />;
    } else if (path === "/dashboard/vehicles") {
      return <Vehicles extraVehicles={extraVehicles} removedRegistrations={removedRegistrations} onActionClick={handleActionClick} />;
    } else if (path === "/dashboard/service-history") {
      return <ServiceHistory />;
    } else if (path === "/dashboard/settings") {
      return <Settings />;
    }
    return <Dashboard />;
  };

  return (
    <div className="bg-gray-50 flex">
      <div className="z-20">
        <DashNav currentPath={location.pathname} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <TopDash onAddVehicle={() => setShowAddVehicle(true)} />
        <main className="ml-75 p-4 pt-20 min-h-screen flex flex-col">
          <div className="flex flex-col flex-1">
            <div className="border rounded-2xl p-4 bg-white font-(--body) flex-1">
              {renderComponent()}
            </div>
          </div>
        </main>
      </div>

      {removeVehicle && (
        <RemoveVehicleModal
          vehicle={removeVehicle}
          onConfirm={handleVehicleRemoved}
          onClose={() => setRemoveVehicle(null)}
        />
      )}
    </div>
  );
}
