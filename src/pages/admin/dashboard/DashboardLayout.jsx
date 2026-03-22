import { useEffect, useRef, useState } from "react";
import { imageUrls } from "../../../config/imageUrls";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import ServiceHistory from "./service-history/ServiceHistory";
import LogoutModal from "./components/LogoutModal";
import navIcon1 from "../../../assets/dashboardImgs/dashNavs/nav1.svg";
import navIcon3 from "../../../assets/dashboardImgs/dashNavs/nav3.svg";
import navIcon1Active from "../../../assets/dashboardImgs/dashNavs/active/nav1.svg";
import navIcon3Active from "../../../assets/dashboardImgs/dashNavs/active/nav3.svg";
import logoutIcon from "../../../assets/dashboardImgs/dashNavs/logout.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOtpPending, logOut } from "../../../redux/slices/appSlice";
import { useSendLoginOTPMutation } from "../../../redux/api/authApiSlice";
import usePost from "../../../hooks/usePost";
import SearchBar from "./components/SearchBar";
import CTA from "../../../components/CTA";
import AddLog from "./service-history/components/AddLog";

const DASHNAVS = [
  {
    id: 1,
    name: "Dashboard",
    img: navIcon1,
    activeImg: navIcon1Active,
    path: "/admin/dashboard",
    dot: false,
  },
  {
    id: 2,
    name: "Service History",
    img: navIcon3,
    activeImg: navIcon3Active,
    path: "/admin/dashboard/service-history",
    dot: true,
  },
];

function MobileHeader({ onAddServiceHistory, onOpenNav }) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b px-4 py-3 flex items-center justify-between">
      <img src={imageUrls.logo} alt="FoliTracks" className="h-7" />
      <div className="flex items-center gap-3">
        <button
          onClick={onAddServiceHistory}
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
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-40 flex flex-col justify-between py-6 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
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
                  className={`flex items-center gap-3 py-3 pr-6 cursor-pointer transition-colors ${isActive
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
                className={`flex  items-center gap-3 py-2 xl:py-3 pr-4 xl:pr-6 cursor-pointer transition-colors ${isActive
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
                  className={`text-[13px] xl:text-[16px] ${isActive
                    ? "text-(--blue) font-semibold"
                    : "text-gray-500 font-medium"
                    }`}
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
  );
}

function TopDash({ onAddServiceHistory }) {
  return (
    <div className="hidden md:block w-full bg-white border-b pl-44 xl:pl-70 fixed top-0 left-0 z-10">
      <div className="flex justify-between px-4 xl:px-8 py-1.5 xl:py-2.5">
        <SearchBar placeholder="search" className="w-55 xl:w-75" />

        <div className="flex gap-3 xl:gap-6 items-center">
          <CTA
            name="+ &nbsp; Log Service"
            color="blue"
            onClick={onAddServiceHistory}
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

  const [showAddLog, setShowAddLog] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [viewVehicle, setViewVehicle] = useState(null);

  const handleActionClick = (row, action) => {
    if (action === "view") setViewVehicle(row);
  };

  const renderComponent = () => {
    if (showAddLog) {
      return (
        <AddLog
          onClose={() => {
            setShowAddLog(false)
            navigate("/admin/dashboard/service-history")
          }}
          onLogAdded={(v) => {
            // handleLogAdded(v);
          }}
        />
      );
    }
    const path = location.pathname;
    if (path === "/admin/dashboard" || path === "/admin/dashboard/") {
      return <Dashboard />;
    } else if (path === "/admin/dashboard/service-history") {
      return <ServiceHistory />;
    }
    return <Dashboard />;
  };

  useEffect(() => {
    setShowAddLog(false);
    setViewVehicle(null);
  }, [location.pathname]);

  return (
    <div className="bg-[#F8FAFC] flex">
      <MobileHeader
        onAddServiceHistory={() => setShowAddLog(true)}
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
        <TopDash onAddServiceHistory={() => setShowAddLog(true)} />
        <main className="md:ml-44 xl:ml-70 px-3 xl:px-8 pb-3 xl:pb-6 pt-16 md:pt-12 xl:pt-18 min-h-screen flex flex-col">
          <div className="flex flex-col flex-1">
            <div className="rounded-2xl pt-8 font-(--body) flex-1 flex flex-col">
              {renderComponent()}
            </div>
          </div>
        </main>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={() => { dispatch(logOut()); navigate("/"); }}
        />
      )}
    </div>
  );
}
