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
  console.log("Top :" , top1);
  

  return (
  <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

    {/* 🔹 Header */}
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        🏆 Top Campaigns
      </h1>
    </div>

    {/*  TOP CAMPAIGN (HERO CARD) */}
    <div className="relative overflow-hidden rounded-3xl p-10 mb-12 
      bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 
      text-white shadow-2xl">

      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🥇 {top1.title}
          </h2>

          <p className="text-sm opacity-90 mt-2">
            Best performing campaign based on revenue
          </p>

          <div className="mt-6 text-5xl font-extrabold tracking-wide">
            ₹ {(top1.revenue || 0).toFixed(2)}
          </div>
        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl">
            <p className="text-xs opacity-80">Clicks</p>
            <p className="font-bold text-lg">{top1.clicks}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl">
            <p className="text-xs opacity-80">Impressions</p>
            <p className="font-bold text-lg">{top1.impressions}</p>
          </div>
        </div>
      </div>
    </div>

    {/* 🔹 OTHER CAMPAIGNS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {others.map((c, index) => {
        const percentage = (c.revenue / top1.revenue) * 100 || 0;

        return (
          <div
            key={c._id}
            className="group relative bg-white/80 backdrop-blur-xl 
            border border-gray-200 rounded-3xl p-6 
            shadow-md hover:shadow-2xl transition-all duration-300 
            hover:-translate-y-2 overflow-hidden"
          >

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition 
              bg-gradient-to-br from-green-100/30 to-emerald-100/30 blur-xl"></div>

            <div className="relative z-10">

              {/* Rank */}
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                {index === 0 && "🥈"}
                {index === 1 && "🥉"}
                {index > 1 && `#${index + 2}`}
                <span className="truncate">{c.title}</span>
              </h3>

              {/* Revenue */}
              <p className="text-xs text-gray-500">Revenue</p>
              <div className="text-2xl font-bold text-green-600 mt-1">
                ₹ {(c.revenue || 0).toFixed(2)}
              </div>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>{percentage.toFixed(1)}%</span>
                  <span>vs Top</span>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default TopCampaigns;