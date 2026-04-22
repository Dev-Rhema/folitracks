function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  );
}

export default function VehicleInfoTab({ vehicle }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Row 1: Make | Model | Year */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Make" value={vehicle.vehicle?.make} />
        <InfoField label="Model" value={vehicle.vehicle?.vehicleModel} />
        <InfoField label="Year" value={vehicle.vehicle?.yearOfManufacture} />
      </div>

      {/* Row 2: Plate | VIN */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Registration/Plate Number" value={vehicle.vehicle?.plateNumber} />
        <InfoField label="VIN" value={vehicle.vehicle?.vin} />
      </div>
    </div>
  );
}
