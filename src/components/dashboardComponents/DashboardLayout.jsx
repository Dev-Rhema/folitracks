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
import VehicleDetails from "./VehicleDetails";
import navIcon1 from "../../assets/dashboardImgs/dashNavs/nav1.svg";
import navIcon2 from "../../assets/dashboardImgs/dashNavs/nav2.svg";
import navIcon3 from "../../assets/dashboardImgs/dashNavs/nav3.svg";
import navIcon4 from "../../assets/dashboardImgs/dashNavs/nav4.svg";
import navIcon1Active from "../../assets/dashboardImgs/dashNavs/active/nav1.svg";
import navIcon2Active from "../../assets/dashboardImgs/dashNavs/active/nav2.svg";
import navIcon3Active from "../../assets/dashboardImgs/dashNavs/active/nav3.svg";
import navIcon4Active from "../../assets/dashboardImgs/dashNavs/active/nav4.svg";
import logoutIcon from "../../assets/dashboardImgs/dashNavs/logout.svg";

const DASHNAVS = [
  { id: 1, name: "Dashboard", img: navIcon1, activeImg: navIcon1Active, path: "/dashboard", dot: false },
  { id: 2, name: "Vehicles", img: navIcon2, activeImg: navIcon2Active, path: "/dashboard/vehicles", dot: false },
  { id: 3, name: "Service History", img: navIcon3, activeImg: navIcon3Active, path: "/dashboard/service-history", dot: true },
  { id: 4, name: "Settings", img: navIcon4, activeImg: navIcon4Active, path: "/dashboard/settings", dot: false },
];

function DashNav({ currentPath }) {
  return (
    <div className="w-56 lg:w-70 bg-white h-screen flex flex-col justify-between py-6 border-r fixed z-1 text-[14px] lg:text-[16px]">
      <div className="flex flex-col gap-8">
        <div className="pl-4 lg:pl-6">
          <img src={imageUrls.logo} alt="" />
        </div>
        <div className="flex flex-col gap-3 ">
          {DASHNAVS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex  items-center gap-3 py-2 lg:py-3 pr-4 lg:pr-6 cursor-pointer transition-colors ${
                  isActive
                    ? "border-l-4 border-(--blue)  pl-4 lg:pl-5 bg-[#E6E6F0]"
                    : "pl-4 lg:pl-6 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <img src={isActive ? item.activeImg : item.img} alt="" className="w-5 h-5 shrink-0" />
                <span
                  className={`text-[14px] lg:text-[16px] ${
                    isActive ? "text-(--blue) font-semibold" : "text-gray-500 font-medium"
                  }`}
                >
                  {item.name}
                </span>
                {/* {item.dot && (
                  <span className="ml-auto w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
                )} */}
              </Link>
            );
          })}
        </div>
      </div>
      <button className="flex items-center gap-3 pl-6 cursor-pointer text-(--red) hover:opacity-70 transition">
        <img src={logoutIcon} alt="" className="w-5 h-5" />
        <span className="text-sm font-medium">Log Out</span>
      </button>
    </div>
  );
}

function TopDash({ onAddVehicle }) {
  return (
    <div className="w-full bg-white border-b pl-70 fixed top-0 left-0 z-10">
      <div className="flex justify-between  px-8 py-2.5">
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
  const [viewVehicle, setViewVehicle] = useState(null);
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
      prev.filter((v) => v.registrationNumber !== vehicle.registrationNumber),
    );
    setViewVehicle(null);
  };

  const handleActionClick = (row, action) => {
    if (action === "view") setViewVehicle(row);
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

    if (viewVehicle) {
      return (
        <VehicleDetails
          vehicle={viewVehicle}
          onClose={() => setViewVehicle(null)}
          onEdit={() => {
            const v = viewVehicle;
            setViewVehicle(null);
            setEditVehicle(v);
          }}
          onRemove={() => setRemoveVehicle(viewVehicle)}
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
      return (
        <Vehicles
          extraVehicles={extraVehicles}
          removedRegistrations={removedRegistrations}
          onActionClick={handleActionClick}
        />
      );
    } else if (path === "/dashboard/service-history") {
      return <ServiceHistory />;
    } else if (path === "/dashboard/settings") {
      return <Settings />;
    }
    return <Dashboard />;
  };

  return (
    <div className="bg-[#F8FAFC] flex">
      <div className="z-20">
        <DashNav currentPath={location.pathname} />
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <TopDash onAddVehicle={() => setShowAddVehicle(true)} />
        <main className="ml-70 px-8 pb-6 pt-18 min-h-screen flex flex-col">
          <div className="flex flex-col flex-1">
            <div className=" rounded-2xl p-6  font-(--body) flex-1">
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
