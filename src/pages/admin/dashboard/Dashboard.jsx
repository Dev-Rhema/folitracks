import { Link } from "react-router-dom";
import DashHeader from "./components/DashHeader";
import Table from "../../../components/ui/Table";
import StatusBadge from "../../../components/ui/StatusBadge";
import { getBrandLogo } from "../../../utils/vehicleUtils";
import { getServiceIcon } from "../../../utils/serviceUtils";
import countImg1 from "../../../assets/dashboardImgs/dashHome/dashCount1.svg";
import countImg2 from "../../../assets/dashboardImgs/dashHome/dashCount2.svg";
import countImg3 from "../../../assets/dashboardImgs/dashHome/dashCount3.svg";
import countImg4 from "../../../assets/dashboardImgs/dashHome/dashCount4.svg";
import { useSelector } from "react-redux";
import { useAdminGetVehiclesQuery } from "../../../redux/api/vehicleApiSlice";
import { useAdminGetServiceHistoryQuery } from "../../../redux/api/serviceHistoryApiSlice";
import useGet from "../../../hooks/useGet";
import EmptyState from "../../../components/ui/EmptyState";
import { capitalizeFirstLetter } from "../../../utils/utils";
import Loader from "../../../components/ui/Loader";


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
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />
  },
];


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

function Row({ item }) {
  return (
    <div
      className="flex items-center justify-between p-2 h-[50px] border-b"
    >
      <div className="flex items-center gap-2 xl:gap-3">
        <img
          src={getServiceIcon(item.service)}
          alt={item.service}
          className="w-7 h-7 xl:w-10 xl:h-10 rounded-full object-cover shrink-0"
        />

        <div>
          <p className="text-xs xl:text-sm font-medium text-gray-800">
            {item?.service}
          </p>
          <p className="text-xs text-gray-400">{item?.vehicle?.make} {item?.vehicle?.vehicleModel} {item?.vehicle?.yearOfManufacture}</p>
        </div>
      </div>

      <StatusBadge
        status={item.serviceStatus}
      />
    </div>
  );
}

export default function Dashboard() {
  const userInfo = useSelector((state) => state.app.userInfo?.user);
  const { data: vehicles, loading: vehiclesLoading } = useGet(useAdminGetVehiclesQuery)
  const { data: serviceHistories, loading: loadingServiceHistories } = useGet(useAdminGetServiceHistoryQuery)

  const allServices = serviceHistories?.serviceHistory || [];

  const HISTORY_DATA = allServices
    .filter((s) => s.serviceStatus === "Completed");

  const OVERDUE_DATA = allServices
    .filter((s) => s.serviceStatus === "Overdue");

  const OTHER_DATA = allServices
    .filter((s) => s.serviceStatus !== "Completed" && s.serviceStatus !== "Overdue");


  const DASHCOUNT = [
    { id: 1, name: "Total Customers", num: "-", img: countImg4 },
    { id: 2, name: "Total Vehicles", num: vehicles?.totalCount, img: countImg1 },
    { id: 3, name: "Upcoming Services", num: OTHER_DATA.length, img: countImg2 },
    { id: 4, name: "Overdue Services", num: OVERDUE_DATA.length, img: countImg3 },
  ];


  if (vehiclesLoading || loadingServiceHistories) {
    return (
      <div className="flex flex-col">
        <DashHeader
          title={`Welcome ${capitalizeFirstLetter(userInfo?.fullname)} 👋`}
          subtitle="Manage your vehicles, track service history, set maintenance reminders all in one place."
        />
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <DashHeader
        title={`Welcome ${capitalizeFirstLetter(userInfo?.fullname)} 👋`}
        subtitle="Manage your vehicles, track service history, set maintenance reminders all in one place."
      />

      <div className="py-3 xl:py-6 rounded-2xl flex flex-col gap-3 xl:gap-6 max-md:overflow-x-scroll">
        <div className="grid grid-cols-4 gap-3 xl:gap-6">
          {DASHCOUNT.map((item) => (
            <StatCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-8 items-stretch">
          <div className="flex flex-col">
            <SectionHeader
              title="Upcoming Services"
              to="/dashboard/service-history"
            />

            <div className="bg-white border rounded-2xl p-2 flex-1 flex flex-col">
              {OTHER_DATA?.length > 0 ? (
                OTHER_DATA?.slice(0, 4)?.map((item, i) => (
                  <Row
                    key={i}
                    item={item}
                  />
                ))
              ) : (
                <EmptyState
                  title="No Upcoming Services Yet"
                  description="Add your previous service history so you can know your next maintenance date."
                />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <SectionHeader
              title="Overdue Services"
              to="/dashboard/service-history"
            />
            <div className="bg-white border rounded-2xl p-2 flex-1 flex flex-col">
              {OVERDUE_DATA.length > 0 ? (
                OVERDUE_DATA.map((item, i) => (
                  <Row
                    key={i}
                    item={item}
                  />
                ))
              ) : (
                <EmptyState
                  title="No Overdue Services Yet"
                  description="Overdue services will appear here when scheduled maintenance is missed."
                />
              )}
            </div>
          </div>
        </div>


        <div className="border p-2.5 bg-white rounded-2xl">
          {HISTORY_DATA.length > 0 ? (<Table
            columns={HISTORY_COLUMNS}
            data={HISTORY_DATA}
            rowsPerPage={4}
            showSearch={false}
            showPagination={false}
            showActions={false}
          />) : (<>

            <EmptyState
              title="No Service History Found"
              description="Keep track of your car's maintenance by logging your previous or recent services here."
            />
          </>)}

        </div>
      </div>
    </div>
  );
}
