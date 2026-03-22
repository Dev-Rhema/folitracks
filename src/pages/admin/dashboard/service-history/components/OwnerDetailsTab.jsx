export default function OwnerDetailsTab({ vehicle }) {
  const ownerName = vehicle.fullName || vehicle.businessName || "—";
  const accountType = vehicle.accountType || "—";
  const email = vehicle.email || vehicle.emailAddress || "—";
  const phone = vehicle.phone || vehicle.phoneNumber || "—";
  const registeredVehicles = vehicle.registeredVehicles ?? vehicle.vehicleCount ?? "—";
  const otherVehicles = vehicle.otherVehicles || [];

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
      {/* Row 1: Name | Account Type | Email */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField
          label={vehicle.businessName ? "Business Name" : "Owner Name"}
          value={ownerName}
        />
        <InfoField label="Account Type" value={accountType} />
        <InfoField label="Email Address" value={email} />
      </div>

      {/* Row 2: Phone | Registered Vehicles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <InfoField label="Phone Number" value={phone} />
        <InfoField label="Registered Vehicles" value={registeredVehicles} />
      </div>

      {/* Other Vehicles */}
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
