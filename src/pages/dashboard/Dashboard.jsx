import { Link } from "react-router-dom";
import DashHeader from "./components/DashHeader";
import Table from "../../components/ui/Table";
import ServiceHistoryCard from "../../components/ui/ServiceHistoryCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { getBrandLogo } from "../../utils/vehicleUtils";
import { getServiceIcon } from "../../utils/serviceUtils";
import countImg1 from "../../assets/dashboardImgs/dashHome/Desktop/dashCount1.svg";
import countImg2 from "../../assets/dashboardImgs/dashHome/Desktop/dashCount2.svg";
import countImg3 from "../../assets/dashboardImgs/dashHome/Desktop/dashCount3.svg";
import { useSelector } from "react-redux";

// ─── Static data ──────────────────────────────────────────────────────────────

const DASHCOUNT = [
  { id: 1, name: "Number of Vehicles", num: 4, img: countImg1 },
  { id: 2, name: "Upcoming Services", num: 20, img: countImg2 },
  { id: 3, name: "Overdue Services", num: 8, img: countImg3 },
];

const MY_VEHICLES_PREVIEW = [
  { vehicle: "Lexus is250 2008", reg: "LGS-142673" },
  { vehicle: "Toyota Camry 2010", reg: "LGS-238491" },
  { vehicle: "Ford Explorer 2019", reg: "LGS-374820" },
];

const UPCOMING_PREVIEW = [
  {
    service: "Suspension Check",
    vehicle: "Lexus IS250 2008",
    status: "Due Today",
  },
  { service: "Fluid Top-up", vehicle: "Lexus IS250 2008", status: "Due Soon" },
  { service: "Oil Change", vehicle: "Lexus IS250 2008", status: "Scheduled" },
];

const HISTORY_PREVIEW = [
  {
    sn: "01",
    service: "Brake Pad",
    vehicle: "Toyota Corolla 2010",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
    status: "Completed",
  },
  {
    sn: "02",
    service: "Suspension",
    vehicle: "Mercedes Benz CLA 2018",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
    status: "Completed",
  },
  {
    sn: "03",
    service: "Diagnostic Scan",
    vehicle: "Mercedes Benz GLA 2020",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
    status: "Completed",
  },
  {
    sn: "04",
    service: "Engine",
    vehicle: "Mercedes Benz GLE 2020",
    reg: "LGS-6689422",
    date: "01/09/2025",
    cost: "₦10,000",
    provider: "Okorometa Ezekiel",
    status: "Completed",
  },
];

// ─── Table column renderers ───────────────────────────────────────────────────

const HISTORY_COLUMNS = [
  { key: "sn", label: "S/N" },
  {
    key: "service",
    label: "Service",
    render: (row) => (
      <div className="flex items-center gap-2 xl:gap-3">
        <img
          src={getServiceIcon(row.service)}
          alt={row.service}
          className="w-6 h-6 xl:w-9 xl:h-9 rounded-full object-cover shrink-0"
        />
        <span className="text-xs xl:text-sm text-gray-800">{row.service}</span>
      </div>
    ),
  },
  {
    key: "vehicle",
    label: "Vehicle",
    render: (row) => (
      <div>
        <p className="text-xs xl:text-sm font-medium text-gray-800">
          {row.vehicle}
        </p>
        <p className="text-xs text-gray-400">{row.reg}</p>
      </div>
    ),
  },
  { key: "date", label: "Date" },
  { key: "cost", label: "Cost" },
  { key: "provider", label: "Service Provider" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, to }) {
  return (
    <div className="flex justify-between items-center mb-2 xl:mb-4">
      <h2 className="text-sm xl:text-lg font-bold text-gray-900">{title}</h2>
      <Link
        to={to}
        className="text-sm text-blue-500 hover:underline font-medium"
      >
        View all
      </Link>
    </div>
  );
}

function StatCard({ item }) {
  return (
    <div className="flex items-center gap-2 xl:gap-4 border py-2 px-3 xl:py-4 xl:px-8 rounded-2xl bg-white">
      <img src={item.img} alt="" className="w-7 h-7 xl:w-auto xl:h-auto" />
      <div className="flex flex-col">
        <p className="text-xs xl:text-sm text-gray-600">{item.name}</p>
        <p className="text-xl xl:text-3xl font-bold text-gray-900">
          {item.num}
        </p>
      </div>
    </div>
  );
}

function VehicleRow({ vehicle, isLast }) {
  const logo = getBrandLogo(vehicle.vehicle);
  return (
    <div
      className={`flex items-center justify-between py-1.5 xl:py-3 ${!isLast ? "border-b" : ""}`}
    >
      <div className="flex items-center gap-2 xl:gap-3">
        <div className="w-7 h-7 xl:w-10 xl:h-10 rounded-full bg-black overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={logo}
            alt={vehicle.vehicle}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-xs xl:text-sm font-medium text-gray-800 truncate">
          {vehicle.vehicle}
        </span>
      </div>
      <span className="text-xs xl:text-sm text-gray-500 shrink-0">
        {vehicle.reg}
      </span>
    </div>
  );
}

function UpcomingRow({ item, isLast }) {
  return (
    <div
      className={`flex items-center justify-between py-1.5 xl:py-3 ${!isLast ? "border-b" : ""}`}
    >
      <div className="flex items-center gap-2 xl:gap-3">
        <img
          src={getServiceIcon(item.service)}
          alt={item.service}
          className="w-7 h-7 xl:w-10 xl:h-10 rounded-full object-cover shrink-0"
        />
        <div>
          <p className="text-xs xl:text-sm font-medium text-gray-800">
            {item.service}
          </p>
          <p className="text-xs text-gray-400">{item.vehicle}</p>
        </div>
      </div>
      <StatusBadge
        status={item.status}
        className="px-2 py-0.5 xl:px-4 xl:py-1.5 text-xs xl:text-sm font-medium"
      />
    </div>
  );
}

export default function Dashboard() {

const userInfo = useSelector((state) => state.app.userInfo);

  return (
    <div>
      <DashHeader
        title={`Welcome ${userInfo?.fullname} 👋`}
        subtitle="Manage your vehicles, track service history, set maintenance reminders all in one place."
      />

      <div className="py-3 xl:py-6 rounded-2xl flex flex-col gap-3 xl:gap-6 max-md:overflow-x-scroll">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 xl:gap-6">
          {DASHCOUNT.map((item) => (
            <StatCard key={item.id} item={item} />
          ))}
        </div>

        {/* My Vehicles + Upcoming Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-8 items-stretch">
          <div className="flex flex-col">
            <SectionHeader title="My Vehicles" to="/dashboard/vehicles" />
            <div className="bg-white border rounded-2xl p-2 xl:p-5 flex-1">
              {MY_VEHICLES_PREVIEW.map((v, i) => (
                <VehicleRow
                  key={i}
                  vehicle={v}
                  isLast={i === MY_VEHICLES_PREVIEW.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <SectionHeader
              title="Upcoming Services"
              to="/dashboard/service-history"
            />
            <div className="bg-white border rounded-2xl p-2 xl:p-5 flex-1">
              {UPCOMING_PREVIEW.map((item, i) => (
                <UpcomingRow
                  key={i}
                  item={item}
                  isLast={i === UPCOMING_PREVIEW.length - 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Service History */}
        <div>
          <SectionHeader
            title="Service History"
            to="/dashboard/service-history"
          />

          <div className="md:hidden space-y-3">
            {HISTORY_PREVIEW.map((row, i) => (
              <ServiceHistoryCard
                key={i}
                icon={getServiceIcon(row.service)}
                title={row.service}
                status={row.status}
                rows={[
                  { label: "Vehicle", value: row.vehicle, subValue: row.reg },
                  { label: "Date", value: row.date },
                  { label: "Cost", value: row.cost },
                  { label: "Service Provider", value: row.provider },
                ]}
                onViewDetails={() => {}}
              />
            ))}
          </div>

          <div className="border p-2.5 bg-white rounded-2xl">
            <div className="hidden md:block overflow-x-auto">
              <Table
                columns={HISTORY_COLUMNS}
                data={HISTORY_PREVIEW}
                rowsPerPage={4}
                showSearch={false}
                showPagination={false}
                showActions={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
