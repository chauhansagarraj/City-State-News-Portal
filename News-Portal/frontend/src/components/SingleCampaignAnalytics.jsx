import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SingleCampaignAnalytics = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/advertiser/campaign-analytics/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return <p>Loading...</p>;
  const colors = {
  blue: {
    bg: "border-blue-500 bg-blue-50",
    text: "text-blue-600",
  },
  green: {
    bg: "border-green-500 bg-green-50",
    text: "text-green-600",
  },
  red: {
    bg: "border-red-500 bg-red-50",
    text: "text-red-600",
  },
  yellow: {
    bg: "border-yellow-500 bg-yellow-50",
    text: "text-yellow-600",
  },
  purple: {
    bg: "border-purple-500 bg-purple-50",
    text: "text-purple-600",
  },
};

  return (
    <div className="space-y-6">

      {/* 🔥 Title */}
      <h1 className="text-2xl font-bold">{data.title}</h1>

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Clicks" value={data.clicks} color={colors.blue} />
  
  <Card title="Impressions" value={data.impressions} color={colors.green} />
  
  <Card title="Spent" value={`₹${data.spent}`} color={colors.red} />
  
  <Card title="CTR" value={`${data.ctr}%`} color={colors.yellow} />
  
  <Card title="CPC" value={`₹${data.cpc}`} color={colors.purple} />
{/* <Card title="ROI" value={`${data.roi}%`} /> */}
      </div>

      {/* 📈 Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Monthly Performance</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#3b82f6"
              name="Clicks"
            />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#3b82f6"
              name="Impressions"
            />
            {/* <Line
              type="monotone"
              dataKey="impressions"
              stroke="#10b981"
              name="spent"
            /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🧾 Recent Activity (Optional but powerful) */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Recent Clicks</h2>

        <ul className="max-h-40 overflow-y-auto text-sm text-gray-600">
          {data.lastClicks?.slice(-5).map((c, i) => (
            <li key={i}>
              {new Date(c.time).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

// 🔹 Card Component
const Card = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl shadow hover:shadow-md transition border-l-4 ${color.bg}`}>
    <p className="text-gray-500">{title}</p>
    <h2 className={`text-xl font-bold mt-2 ${color.text}`}>
      {value}
    </h2>
  </div>
);

export default SingleCampaignAnalytics;