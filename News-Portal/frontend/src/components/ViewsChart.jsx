import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ViewsChart = ({ articles }) => {

  // 🔹 Combine all articles' viewsHistory
  const chartData = articles
    .flatMap(article => article.viewsHistory || [])
    .reduce((acc, curr) => {

      const existing = acc.find(item => item.date === curr.date);

      if (existing) {
        existing.views += curr.count;
      } else {
        acc.push({
          date: curr.date,
          views: curr.count,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">📈 Views Over Time</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views"   stroke="#3b82f6"
  strokeWidth={3}
  dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewsChart;