import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDashboard } from "../store/slices/dashboardSlice"
import { motion, AnimatePresence } from "framer-motion"
import {
    PieChart, Pie, Cell, Tooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts"
import ViewsChart from "../components/ViewsChart"
import { ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#facc15", "#22c55e", "#ef4444"]


const JournalistDashboard = () => {

    const [sortField, setSortField] = useState("date")
    const [sortOrder, setSortOrder] = useState("desc") // asc | desc
    const [selectedDate, setSelectedDate] = useState("")

    const [filterType, setFilterType] = useState("month")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    

    const dispatch = useDispatch()
    const { stats, articles, loading } = useSelector(state => state.dashboard)

    useEffect(() => {
        dispatch(getDashboard())
    }, [dispatch])

    if (loading) return <p className="p-6">Loading...</p>


    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("desc")
        }
    }



    const filteredArticles = articles.filter(a => {
        //   if (a.status !== "published") return false

        const date = new Date(a.createdAt)

        if (filterType === "month" && selectedMonth) {
            const [year, month] = selectedMonth.split("-")
            return (
                date.getFullYear() === Number(year) &&
                date.getMonth() + 1 === Number(month)
            )
        }

        if (filterType === "year" && selectedYear) {
            return date.getFullYear() === Number(selectedYear)
        }

        return true
    })

    const sortedArticles = [...filteredArticles]
        .filter(a => a.status === "published")
        .filter(a => {
            if (!selectedDate) return true

            const articleDate = new Date(a.createdAt)
                .toISOString()
                .split("T")[0]

            return articleDate === selectedDate
        })
        .sort((a, b) => {
            let valA, valB

            if (sortField === "date") {
                valA = new Date(a.createdAt)
                valB = new Date(b.createdAt)
            } else if (sortField === "views") {
                valA = a.views
                valB = b.views
            } else if (sortField === "likes") {
                valA = a.likes?.length || 0
                valB = b.likes?.length || 0
            }

            if (sortOrder === "asc") return valA > valB ? 1 : -1
            return valA < valB ? 1 : -1
        })
        .slice(0, 10)

    const pieStats = filteredArticles.reduce(
        (acc, article) => {
            acc[article.status] = (acc[article.status] || 0) + 1
            return acc
        },
        {}
    )


    //  Pie Chart Data

    const pieData = [
        { name: "Drafts", value: pieStats["draft"] || 0 },
        { name: "Pending", value: pieStats["pending"] || 0 },
        { name: "Published", value: pieStats["published"] || 0 },
        { name: "Rejected", value: pieStats["rejected"] || 0 },
    ]

    //  Bar Chart Data (Top 5 Articles)
    const barData = filteredArticles
        .filter(a => a.status === "published") //  only published
        .sort((a, b) => b.views - a.views)     //  highest views first
        .slice(0, 10)                            //  top 10
        .map(a => ({
            name: a.title.length > 15 ? a.title.substring(0, 15) + "..." : a.title,
            views: a.views
        }))

    const filteredStats = {
        totalArticles: filteredArticles.length,

        drafts: filteredArticles.filter(a => a.status === "draft").length,

        pending: filteredArticles.filter(a => a.status === "pending").length,

        published: filteredArticles.filter(a => a.status === "published").length,

        totalViews: filteredArticles.reduce(
            (sum, a) => sum + (a.views || 0),
            0
        ),

        totalLikes: filteredArticles.reduce(
            (sum, a) => sum + (a.likes?.length || 0),
            0
        ),
    }

    return (

<div className="p-6 space-y-8 w-full">
            {/* 🔹 HEADER */}
            <h1 className="text-3xl font-bold">
                Journalist Dashboard
            </h1>

            {/* 🔹 STATS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                <div className="bg-blue-500 text-white p-4 rounded shadow">
                    <h3>Total</h3>
                    <p className="text-2xl font-bold">{filteredStats.totalArticles}</p>
                </div>

                <div className="bg-yellow-500 text-white p-4 rounded shadow">
                    <h3>Drafts</h3>
                    <p className="text-2xl">{filteredStats.drafts}</p>
                </div>

                <div className="bg-orange-500 text-white p-4 rounded shadow">
                    <h3>Pending</h3>
                    <p className="text-2xl">{filteredStats.pending}</p>
                </div>

                <div className="bg-green-500 text-white p-4 rounded shadow">
                    <h3>Published</h3>
                    <p className="text-2xl">{filteredStats.published}</p>
                </div>

                <div className="bg-purple-500 text-white p-4 rounded shadow">
                    <h3>Views</h3>
                    <p className="text-2xl">{filteredStats.totalViews}</p>
                </div>

                <div className="bg-pink-500 text-white p-4 rounded shadow">
                    <h3>Likes</h3>
                    <p className="text-2xl">{filteredStats.totalLikes}</p>
                </div>

            </div>

            {/* 🔹 CHARTS */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* PIE CHART */}
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="mb-4 font-semibold">Article Status</h3>

                   <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      cx="50%"
      cy="50%"
      outerRadius={80}
      label
    >
      {pieData.map((entry, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

                </div>

                {/* BAR CHART */}
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="mb-4 font-semibold">Top Articles (Views)</h3>

                    {barData.length === 0 ? (
                        <p className="text-gray-500">No published articles yet</p>
                    ) : (
                     <ResponsiveContainer width="100%" height={250}>
  <BarChart data={barData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="views" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
                    )}

                </div>

                <ViewsChart articles={filteredArticles} />

                <div className="bg-white p-4 rounded-2xl shadow-md flex flex-wrap items-center gap-4 mb-6">

                    {/* Label */}
                    <p className="font-semibold text-gray-600">Filter By:</p>

                    {/* Filter Type */}
                    <div className="relative">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="appearance-none border border-gray-300 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>

                        {/* Dropdown Icon */}
                        <span className="absolute right-2 top-2 text-gray-400">▼</span>
                    </div>

                    {/* Month Picker */}
                    {filterType === "month" && (
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    )}

                    {/* Year Picker */}
                    {filterType === "year" && (
                        <input
                            type="number"
                            placeholder="Enter Year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="border border-gray-300 px-4 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    )}

                    {/* Clear Button */}
                    <button
                        onClick={() => {
                            setSelectedMonth("")
                            setSelectedYear("")
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 shadow-sm"
                    >
                        Clear
                    </button>

                </div>
            </div>

            {/* <div className="mb-4 flex gap-4 items-center">


<p>Select Article By Date :</p>
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="border p-2 rounded"
  />

  <button
    onClick={() => setSelectedDate("")}
    className="bg-gray-200 px-3 py-2 rounded"
  >
    Clear
  </button>

</div> */}

            {/* 🔹 RECENT ARTICLES */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold text-gray-800">Recent Articles</h3>
    <span className="text-sm text-gray-500">
      Showing {sortedArticles.slice(0, 10).length} articles
    </span>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">

      {/* Head */}
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
        <tr>
          <th className="p-3">Title</th>

          <th className="p-3">Status</th>

          <th
            className="p-3 cursor-pointer hover:text-blue-600 transition"
            onClick={() => handleSort("date")}
          >
            Date {sortField === "date" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
          </th>

          <th
            className="p-3 cursor-pointer hover:text-blue-600 transition"
            onClick={() => handleSort("views")}
          >
            Views {sortField === "views" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
          </th>

          <th
            className="p-3 cursor-pointer hover:text-blue-600 transition"
            onClick={() => handleSort("likes")}
          >
            Likes {sortField === "likes" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y">

        {sortedArticles.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-6 text-gray-400">
              No articles found
            </td>
          </tr>
        ) : (
          sortedArticles.slice(0, 10).map((a) => (
            <tr
              key={a._id}
              className="hover:bg-gray-50 transition duration-150"
            >
              {/* Title */}
              <td className="p-3 font-medium text-gray-800">
                {a.title}
              </td>

              {/* Status Badge */}
              <td className="p-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium 
                  ${
                    a.status === "published"
                      ? "bg-green-100 text-green-700"
                      : a.status === "draft"
                      ? "bg-yellow-100 text-yellow-700"
                      : a.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {a.status}
                </span>
              </td>

              {/* Date */}
              <td className="p-3 text-gray-600">
                {new Date(a.createdAt).toLocaleDateString()}
              </td>

              {/* Views */}
              <td className="p-3 text-gray-700 font-medium">
                {a.views}
              </td>

              {/* Likes */}
              <td className="p-3 text-gray-700 font-medium">
                ❤️ {a.likes?.length || 0}
              </td>
            </tr>
          ))
        )}

      </tbody>
    </table>
  </div>
</div>

        </div>
    )
}

export default JournalistDashboard