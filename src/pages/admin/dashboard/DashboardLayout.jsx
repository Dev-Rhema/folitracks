import { useEffect, useRef, useState } from "react";
import { imageUrls } from "../../../config/imageUrls";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import LoginOTPModal from "../../../components/auth/LoginOTPModal";
import Vehicles from "./Vehicles";
import Dashboard from "./Dashboard";
import ServiceHistory from "./ServiceHistory";
import Settings from "./Settings";
import AddVehicleForm from "./components/AddVehicleForm";
import EditVehicleForm from "./components/EditVehicleForm";
import RemoveVehicleModal from "./components/RemoveVehicleModal";
import VehicleDetails from "./components/VehicleDetails";
import LogoutModal from "./components/LogoutModal";
import navIcon1 from "../../../assets/dashboardImgs/dashNavs/nav1.svg";
import navIcon2 from "../../../assets/dashboardImgs/dashNavs/nav2.svg";
import navIcon3 from "../../../assets/dashboardImgs/dashNavs/nav3.svg";
import navIcon4 from "../../../assets/dashboardImgs/dashNavs/nav4.svg";
import navIcon1Active from "../../../assets/dashboardImgs/dashNavs/active/nav1.svg";
import navIcon2Active from "../../../assets/dashboardImgs/dashNavs/active/nav2.svg";
import navIcon3Active from "../../../assets/dashboardImgs/dashNavs/active/nav3.svg";
import navIcon4Active from "../../../assets/dashboardImgs/dashNavs/active/nav4.svg";
import logoutIcon from "../../../assets/dashboardImgs/dashNavs/logout.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOtpPending, logOut } from "../../../redux/slices/appSlice";
import { useSendLoginOTPMutation } from "../../../redux/api/authApiSlice";
import usePost from "../../../hooks/usePost";
import SearchBar from "./components/SearchBar";
import CTA from "../../../components/CTA";

const DASHNAVS = [
  {
    id: 1,
    name: "Dashboard",
    img: navIcon1,
    activeImg: navIcon1Active,
    path: "/dashboard",
    dot: false,
  },
  {
    id: 2,
    name: "Vehicles",
    img: navIcon2,
    activeImg: navIcon2Active,
    path: "/dashboard/vehicles",
    dot: false,
  },
  {
    id: 3,
    name: "Service History",
    img: navIcon3,
    activeImg: navIcon3Active,
    path: "/dashboard/service-history",
    dot: true,
  },
  {
    id: 4,
    name: "Settings",
    img: navIcon4,
    activeImg: navIcon4Active,
    path: "/dashboard/settings",
    dot: false,
  },
];

function MobileHeader({ onAddVehicle, onOpenNav }) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b px-4 py-3 flex items-center justify-between">
      <img src={imageUrls.logo} alt="FoliTracks" className="h-7" />
      <div className="flex items-center gap-3">
        <button
          onClick={onAddVehicle}
          className="w-9 h-9 bg-(--darkBlue) rounded-xl flex items-center justify-center text-white text-xl leading-none"
        >
          +
        </button>
        <button className="w-9 h-9 bg-[#EEF1F8] rounded-full flex items-center justify-center">
          <Bell size={16} />
        </button>
        <button
          onClick={onOpenNav}
          className="w-9 h-9 flex items-center justify-center"
        >
          <Menu size={22} />
        </button>
      </div>
    </div>
  );
}

function MobileNavDrawer({ currentPath, open, onClose, onLogout }) {
  return (
    <>
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={onClose}
        />
      )}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-40 flex flex-col justify-between py-6 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="pl-6 pr-4 flex items-center justify-between">
            <img src={imageUrls.logo} alt="" className="w-24" />
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {DASHNAVS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 py-3 pr-6 cursor-pointer transition-colors ${
                    isActive
                      ? "border-l-4 border-(--blue) pl-5 bg-[#E6E6F0]"
                      : "pl-6 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={isActive ? item.activeImg : item.img}
                    alt=""
                    className="w-5 h-5 shrink-0"
                  />
                  <span
                    className={`text-sm ${isActive ? "text-(--blue) font-semibold" : "text-gray-500 font-medium"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-3 pl-6 cursor-pointer text-(--red) hover:opacity-70 transition">
          <img src={logoutIcon} alt="" className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </>
  );
}

function DashNav({ currentPath, onLogout }) {
  return (
    <div className="hidden md:flex w-44 xl:w-70 bg-white h-screen flex-col justify-between py-4 xl:py-6 border-r fixed z-1 text-[13px] xl:text-[16px]">
      <div className="flex flex-col gap-6 xl:gap-8">
        <div className="pl-4 xl:pl-6">
          <img src={imageUrls.logo} alt="" className="w-24 xl:w-auto" />
        </div>
        <div className="flex flex-col gap-2 xl:gap-3">
          {DASHNAVS.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex  items-center gap-3 py-2 xl:py-3 pr-4 xl:pr-6 cursor-pointer transition-colors ${
                  isActive
                    ? "border-l-4 border-(--blue)  pl-4 xl:pl-5 bg-[#E6E6F0]"
                    : "pl-4 xl:pl-6 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <img
                  src={isActive ? item.activeImg : item.img}
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <span
                  className={`text-[13px] xl:text-[16px] ${
                    isActive
                      ? "text-(--blue) font-semibold"
                      : "text-gray-500 font-medium"
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
      <button onClick={onLogout} className="flex items-center gap-3 pl-6 cursor-pointer text-(--red) hover:opacity-70 transition">
        <img src={logoutIcon} alt="" className="w-5 h-5" />
        <span className="text-sm font-medium">Log Out</span>
      </button>
    </div>
  );
}

function TopDash({ onAddVehicle }) {
  return (
    <div className="hidden md:block w-full bg-white border-b pl-44 xl:pl-70 fixed top-0 left-0 z-10">
      <div className="flex justify-between px-4 xl:px-8 py-1.5 xl:py-2.5">
        <SearchBar placeholder="search" className="w-55 xl:w-75" />

        <div className="flex gap-3 xl:gap-6 items-center">
          <CTA
            name="+ &nbsp; Add Vehicle"
            color="blue"
            onClick={onAddVehicle}
          />
          <div className="bg-[#EEF1F8] w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-center rounded-full cursor-pointer">
            <Bell size={16} />
          </div>
          <span className="w-8 h-8 xl:w-12 xl:h-12 flex items-center justify-center text-center bg-(--darkBlue) rounded-full">
            <p className="text-sm xl:text-xl text-white">CE</p>
          </span>
        </div>
      </div>
    </div>
  );
}


export default function DashboardLayout() {
  const { isOtpPending, loginMethod, userInfo } = useSelector((state) => state.app);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postData: sendLoginOTP } = usePost(useSendLoginOTPMutation);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromUrl = params.get("email");

    // Handle external QR scan landing directly on dashboard
    if (emailFromUrl && !userInfo && !isOtpPending && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        const handleExternalScan = async () => {
            try {
                const res = await sendLoginOTP({ email: emailFromUrl }, "Verification code sent to your email!");
                if (res.status === 200 || res.status == true) {
                    dispatch(setOtpPending({ 
                        isOtpPending: true, 
                        loginMethod: "qr",
                        otpEmail: emailFromUrl
                    }));
                } else {
                    // If API fails, redirect to home
                    navigate("/");
                }
            } catch (err) {
                console.error("External Scan landing error:", err);
                navigate("/");
            }
        };
        handleExternalScan();
        return; // Prevent immediate redirect
    }

    // Normal security guard: if no user and no pending OTP, kick back to login
    if (!userInfo && !isOtpPending) {
      navigate("/");
    }
  }, [userInfo, isOtpPending, navigate, location.search, dispatch, sendLoginOTP]);

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [viewVehicle, setViewVehicle] = useState(null);
  const [editVehicle, setEditVehicle] = useState(null);

  useEffect(() => {
    setShowAddVehicle(false);
    setViewVehicle(null);
    setEditVehicle(null);
  }, [location.pathname]);
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

  if (isOtpPending && loginMethod === "qr") {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <LoginOTPModal />
        
        <div className="opacity-20 pointer-events-none blur-sm">
           <DashNav currentPath={location.pathname} />
           <div className="flex-1 min-w-0">
             <TopDash onAddVehicle={() => {}} />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] flex">
      <MobileHeader
        onAddVehicle={() => setShowAddVehicle(true)}
        onOpenNav={() => setMobileNavOpen(true)}
      />
      <MobileNavDrawer
        currentPath={location.pathname}
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onLogout={() => { setMobileNavOpen(false); setShowLogoutModal(true); }}
      />

      <div className="z-20">
        <DashNav currentPath={location.pathname} onLogout={() => setShowLogoutModal(true)} />
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        <TopDash onAddVehicle={() => setShowAddVehicle(true)} />
        <main className="md:ml-44 xl:ml-70 px-3 xl:px-8 pb-3 xl:pb-6 pt-16 md:pt-12 xl:pt-18 min-h-screen flex flex-col">
          <div className="flex flex-col flex-1">
            <div className="rounded-2xl p-2 pt-4 font-(--body) flex-1 flex flex-col">
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

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => { dispatch(logOut()); navigate("/"); }}
        />
      )}
    </div>
  );
}
