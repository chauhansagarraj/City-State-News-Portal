import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertiserDashboard } from "../store/slices/advertiserDashboardSlice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.advertiserDashboard);

  useEffect(() => {
    dispatch(getAdvertiserDashboard());
  }, [dispatch]);

  if (!dashboard) return <p>Loading...</p>;

  // 📊 Line Chart Data (dummy timeline)
  const lineData = [
    { name: "Clicks", value: dashboard.totalClicks },
    { name: "Impressions", value: dashboard.totalImpressions },
  ];
const STATUS_COLORS = {
  active: "#22c55e",
  paused: "#eab308",
  pending: "#3b82f6",
  draft: "#6b7280",
  completed: "#a855f7",
};
  // 🥧 Pie Chart Data
  const pieData = Object.entries(dashboard.statusCounts).map(
  ([key, value]) => ({
    name: key,
    value,
  })
);

  const COLORS = ["#2563eb", "#9ca3af"];

  return (
    <div className="space-y-6">

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Campaigns" value={dashboard.totalCampaigns} />
        <Card title="Active Campaigns" value={dashboard.activeCampaigns} />
        <Card title="Clicks" value={dashboard.totalClicks} />
        <Card title="Impressions" value={dashboard.totalImpressions} />
        <Card title="Spent" value={`₹${dashboard.totalSpent}`} />
        {/* <Card title="Revenue" value={`₹${dashboard.totalRevenue}`} /> */}
{/* <Card title="Profit" value={`₹${dashboard.totalProfit}`} /> */}
<Card title="Avg CPC" value={`₹${dashboard.overallCPC}`} />
{/* <Card title="ROI" value={`${dashboard.overallROI}%`} /> */}
        <Card title="Wallet" value={`₹${dashboard.walletBalance}`} />
      </div>

      {/* 📊 Charts */}
      <div className="grid grid-cols-2 gap-6">

        {/* 📈 Line Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Performance</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🥧 Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Campaign Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;

// 🔹 Reusable Card Component
const Card = ({ title, value }) => (
  <div className="bg-blue-300 p-5 rounded-xl shadow hover:shadow-md transition">
    <p className="text-black-500 font-bold">{title}</p>
    <h2 className="text-2xl font-bold mt-2">{value}</h2>
  </div>
);