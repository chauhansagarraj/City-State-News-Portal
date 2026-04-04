import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenue } from "../store/slices/adminRevenueSlice";

const AdminRevenue = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.revenue);

  useEffect(() => {
    dispatch(fetchRevenue());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
  <div className="p-6 space-y-6">

    {/*  Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
        📊 Revenue Dashboard
      </h1>
    </div>

    {/*  Loading */}
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading revenue data...
        </p>
      </div>
    ) : (
      
      /*  Cards Grid */
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-3xl shadow-md border hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
          >
            
            {/* Top Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {c.title}
              </h2>

            

              {/* Status Badge */}
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${
                  c.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : c.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* Middle Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="bg-gray-50 rounded-xl p-2">
                <p className="text-xs text-gray-500">Clicks</p>
                <p className="font-semibold text-gray-800">{c.clicks}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2">
                <p className="text-xs text-gray-500">Cost Per Click</p>
                <p className="font-semibold text-gray-800">₹{c.costPerClick.toFixed(2)}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-2">
                <p className="text-xs text-gray-500">Impressions</p>
                <p className="font-semibold text-gray-800">{c.impressions}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-2">
                <p className="text-xs text-gray-500">Cost Per Impressions</p>
                <p className="font-semibold text-gray-800">₹{c.costPerImpression.toFixed(2)}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-2">
                <p className="text-xs text-gray-500">Spent</p>
                <p className="font-semibold text-gray-800">₹{c.spent}</p>
              </div>
            </div>

            {/* Revenue Highlight */}
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ₹ {c.revenue.toFixed(2)}
              </p>
            </div>

          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default AdminRevenue;