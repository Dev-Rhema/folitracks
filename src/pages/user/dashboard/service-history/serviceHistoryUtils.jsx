import { getServiceIcon } from "../../../../utils/serviceUtils";

export const renderServiceCell = (row) => (
  <div className="flex items-center gap-2 lg:gap-3">
    <img
      src={getServiceIcon(row.service)}
      alt={row.service}
      className="w-7 h-7 rounded-full object-cover shrink-0"
    />
    <span>{row.service}</span>
  </div>
);

export const renderVehicleCell = (row) => {
  const vehicle = row.vehicle;
  return (
    <div>
      <div className="font-medium text-gray-800 text-sm">{vehicle?.make} {vehicle?.vehicleModel} {vehicle?.yearOfManufacture}</div>
      {vehicle?.plateNumber && <div className="text-xs text-gray-400">{vehicle?.plateNumber}</div>}
    </div>
  );
};
