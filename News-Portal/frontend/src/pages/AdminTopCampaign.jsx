import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopCampaigns } from "../store/slices/adminRevenueSlice";

const TopCampaigns = () => {
  const dispatch = useDispatch();
  const { topCampaigns, loading } = useSelector(
    (state) => state.revenue
  );

  useEffect(() => {
    dispatch(fetchTopCampaigns());
  }, [dispatch]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading dashboard...
      </p>
    );

  if (!topCampaigns.length)
    return <p className="text-center mt-10">No data</p>;

  const top1 = topCampaigns[0];
  const others = topCampaigns.slice(1);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        🏆 <span>Top Campaigns</span>
      </h1>

      <div className="relative overflow-hidden rounded-3xl p-8 mb-10 
        bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 
        text-white shadow-2xl">

        <div className="absolute inset-0 bg-white opacity-10 blur-2xl"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🥇 {top1.title}
          </h2>

          <p className="text-sm opacity-90 mt-1">
            Top performing campaign
          </p>

          <div className="mt-6 text-4xl font-bold tracking-wide">
            ₹ {(top1.revenue || 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* OTHER CAMPAIGNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {others.map((c, index) => {
          const percentage =
            (c.revenue / top1.revenue) * 100 || 0;

          return (
            <div
              key={c._id}
              className="group bg-white/70 backdrop-blur-lg 
              border border-gray-200 rounded-2xl p-6 
              shadow-md hover:shadow-xl transition-all duration-300 
              hover:-translate-y-1"
            >
              {/* Rank */}
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                {index === 0 && "🥈"}
                {index === 1 && "🥉"}
                {index > 1 && `#${index + 2}`}
                {c.title}
              </h3>

              {/* Revenue */}
              <p className="text-sm text-gray-500">Revenue</p>
              <div className="text-2xl font-bold text-green-600 mt-1">
                ₹ {(c.revenue || 0).toFixed(2)}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {percentage.toFixed(1)}% of top campaign
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCampaigns;