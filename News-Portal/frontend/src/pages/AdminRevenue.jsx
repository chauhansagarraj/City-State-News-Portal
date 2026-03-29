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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Revenue Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((c) => (
          <div
            key={c._id}
            className="bg-white shadow-lg rounded-2xl p-5 border"
          >
            <h2 className="text-lg font-semibold mb-2">{c.title}</h2>

            <p className="text-sm text-gray-500 mb-2">
              Type: {c.type}
            </p>

            <div className="space-y-1 text-sm">
              <p>👆 Clicks: {c.clicks}</p>
              <p>👁 Impressions: {c.impressions}</p>
              <p>💸 Spent: ₹{c.spent}</p>
            </div>

            <div className="mt-4 text-xl font-bold text-green-600">
              ₹ {c.revenue.toFixed(2)}
            </div>

            <p
              className={`mt-2 text-xs ${
                c.status === "approved"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {c.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRevenue;