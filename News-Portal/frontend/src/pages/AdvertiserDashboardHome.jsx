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

const cardStyles = [
  { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-600" },
  { bg: "bg-green-50", border: "border-green-500", text: "text-green-600" },
  { bg: "bg-purple-50", border: "border-purple-500", text: "text-purple-600" },
  { bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-600" },
  { bg: "bg-red-50", border: "border-red-500", text: "text-red-600" },
  { bg: "bg-pink-50", border: "border-pink-500", text: "text-pink-600" },
  { bg: "bg-indigo-50", border: "border-indigo-500", text: "text-indigo-600" },
  { bg: "bg-teal-50", border: "border-teal-500", text: "text-teal-600" },
];

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
  <Card title="Total Campaigns" value={dashboard.totalCampaigns} style={cardStyles[0]} />
  <Card title="Active Campaigns" value={dashboard.activeCampaigns} style={cardStyles[1]} />
  <Card title="Clicks" value={dashboard.totalClicks} style={cardStyles[2]} />
  <Card title="Impressions" value={dashboard.totalImpressions} style={cardStyles[3]} />
  <Card title="Spent" value={`₹${dashboard.totalSpent}`} style={cardStyles[4]} />
  <Card title="Avg CPC" value={`₹${dashboard.overallCPC}`} style={cardStyles[5]} />
  <Card title="Wallet" value={`₹${dashboard.walletBalance}`} style={cardStyles[6]} />
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
const Card = ({ title, value, style }) => (
  <div
    className={`p-5 rounded-xl shadow hover:shadow-lg transition border-l-4 ${style.bg} ${style.border}`}
  >
    <p className="text-gray-500 text-sm">{title}</p>

    <h2 className={`text-2xl font-bold mt-2 ${style.text}`}>
      {value}
    </h2>
  </div>
);