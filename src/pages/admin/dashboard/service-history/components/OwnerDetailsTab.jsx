export default function OwnerDetailsTab({ vehicle }) {
  const ownerName = vehicle?.vehicle?.fullName || vehicle?.vehicle?.businessName || "—";
  const accountType = vehicle?.accountType || "—";
  const email = vehicle?.user?.email || vehicle?.emailAddress || "—";
  const phone = vehicle?.phone || vehicle?.phoneNumber || "—";
  const registeredVehicles = vehicle?.registeredVehicles ?? vehicle?.vehicleCount ?? "—";
  const otherVehicles = vehicle?.otherVehicles || [];

  function InfoField({ label, value }) {
    return (
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField
          label={vehicle?.vehicle?.businessName ? "Business Name" : "Owner Name"}
          value={ownerName}
        />
        <InfoField label="Account Type" value={vehicle?.vehicle?.accountType} />
        <InfoField label="Email Address" value={vehicle?.user[0]?.email} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Phone Number" value={vehicle?.user[0]?.phone} />
        <InfoField label="Registered Vehicles" value={registeredVehicles} />
      </div>

      {otherVehicles.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-3">Other Vehicles</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherVehicles.map((v, i) => (
              <p key={i} className="text-sm text-gray-700">
                {v}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
