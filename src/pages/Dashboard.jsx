import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Welcome to your FoliTracks dashboard. This is where you can manage
            your vehicle service history and records.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Service History
              </h3>
              <p className="text-blue-700">
                View your complete vehicle service records
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                My Vehicles
              </h3>
              <p className="text-green-700">Manage your registered vehicles</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                Parts Order
              </h3>
              <p className="text-purple-700">Order authentic spare parts</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
