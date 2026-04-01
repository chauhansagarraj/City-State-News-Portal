import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard,
  fetchMonthlyRevenue,
  fetchTopCampaigns,
    fetchLocationAnalytics,
} from "../store/slices/adminDashboardSlice";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];


const AdminDashboardHome = () => {
  const dispatch = useDispatch();

  const { dashboard, revenue, campaigns, loading } = useSelector(
    (state) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchMonthlyRevenue());
    dispatch(fetchTopCampaigns());
    dispatch(fetchLocationAnalytics());
  }, [dispatch]);
//   const { location } = useSelector((state) => state.adminDashboard);

  if (loading || !dashboard) return <div>Loading...</div>;

  const { users, articles, campaigns: camp, revenue: rev } = dashboard;
const userPieData = [
  { name: "Readers", value: users.readers },
  { name: "Journalists", value: users.journalists },
  { name: "Advertisers", value: users.advertisers },
];
const articlePieData = [
  { name: "Published", value: articles.publishedArticles },
  { name: "Pending", value: articles.pendingArticles },
];

const campaignPieData = [
  { name: "Active", value: camp.activeCampaigns },
  { name: "Completed", value: camp.completedCampaigns },
  { name: "Paused", value: camp.pausedCampaigns },
];
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-4 gap-6">
        <Card title="Total Users" value={users.totalUsers} color="bg-blue-500" />
        <Card title="Total Articles" value={articles.totalArticles} color="bg-green-500" />
        <Card title="Total Campaigns" value={camp.totalCampaigns} color="bg-purple-500" />
        <Card title="Revenue" value={`₹${rev.totalRevenue}`} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Top Campaigns (Clicks)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaigns}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
  <PieCard title="User Distribution" data={userPieData} />

  <PieCard title="Article Distribution" data={articlePieData} />

  <PieCard title="Campaign Distribution" data={campaignPieData} />

</div>


      <div className="grid grid-cols-3 gap-6">

        <StatCard title="Active Users" value={users.activeUsers} />
        <StatCard title="Blocked Users" value={users.blockedUsers} />
        <StatCard title="Pending Articles" value={articles.pendingArticles} />

        <StatCard title="Published Articles" value={articles.publishedArticles} />
        <StatCard title="Active Campaigns" value={camp.activeCampaigns} />
        <StatCard title="Clicks" value={rev.totalClicks} />

      </div>

    </div>
  );
};

export default AdminDashboardHome;

// ================= COMPONENTS =================
const PieCard = ({ title, data }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="font-semibold mb-4">{title}</h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            borderRadius: "10px",
            border: "none",
          }}
        />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const Card = ({ title, value, color }) => (
  <div className={`p-5 rounded-2xl text-white shadow ${color}`}>
    <h3 className="text-sm">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);