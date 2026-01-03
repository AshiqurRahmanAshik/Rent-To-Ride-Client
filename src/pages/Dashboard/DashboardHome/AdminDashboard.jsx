import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [bookingsByCategory, setBookingsByCategory] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);
  const [carStatus, setCarStatus] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:9000"; // Update with your API URL

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  const fetchAdminDashboard = async () => {
    try {
      setLoading(true);

      // Fetch all dashboard data
      const [overviewRes, categoryRes, revenueRes, statusRes, activityRes] =
        await Promise.all([
          axios.get(`${API_URL}/dashboard/admin`),
          axios.get(`${API_URL}/dashboard/admin/bookings-by-category`),
          axios.get(`${API_URL}/dashboard/admin/revenue-by-month`),
          axios.get(`${API_URL}/dashboard/admin/car-status`),
          axios.get(`${API_URL}/dashboard/admin/recent-activity?limit=10`),
        ]);

      setOverview(overviewRes.data.overview);
      setBookingsByCategory(categoryRes.data);
      setRevenueByMonth(revenueRes.data);
      setCarStatus(statusRes.data);
      setRecentActivity(activityRes.data);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch admin dashboard:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Transform data for charts
  const categoryChartData = bookingsByCategory.map((item) => ({
    name: item._id || "Unknown",
    bookings: item.count,
    revenue: item.revenue,
  }));

  const revenueChartData = revenueByMonth.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    revenue: item.totalRevenue,
    bookings: item.bookingCount,
  }));

  const statusPieData = carStatus.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard 🎯
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive overview of your platform
          </p>
        </div>
        <button
          onClick={fetchAdminDashboard}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={overview?.totalUsers || 0}
          icon="👥"
          bgColor="bg-blue-500"
          change="+12%"
        />
        <StatsCard
          title="Total Cars"
          value={overview?.totalCars || 0}
          icon="🚗"
          bgColor="bg-green-500"
          subtitle={`${overview?.availableCars || 0} Available`}
        />
        <StatsCard
          title="Total Bookings"
          value={overview?.totalBookings || 0}
          icon="📊"
          bgColor="bg-purple-500"
          subtitle={`${overview?.recentBookingsCount || 0} this week`}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${(overview?.totalRevenue || 0).toLocaleString()}`}
          icon="💰"
          bgColor="bg-orange-500"
          change="+8%"
        />
      </div>

      {/* Charts Section - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings by Category - Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bookings by Category
          </h2>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#0088FE" name="Bookings" />
                <Bar dataKey="revenue" fill="#00C49F" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-10">No data available</p>
          )}
        </div>

        {/* Car Status Distribution - Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Car Status Distribution
          </h2>
          {statusPieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-10">No data available</p>
          )}
        </div>
      </div>

      {/* Revenue Breakdown - Donut Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Monthly Revenue Distribution
        </h2>

        {revenueChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={revenueChartData}
                cx="50%"
                cy="50%"
                labelLine={{
                  stroke: "#6b7280",
                  strokeWidth: 1,
                }}
                label={({ month, percent }) =>
                  `${month} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={140}
                innerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
                paddingAngle={5}
              >
                {revenueChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={3}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 15px",
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading chart data...</p>
          </div>
        )}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>
          <a
            href="/dashboard/manage-bookings"
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            View All →
          </a>
        </div>
        {recentActivity.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Car
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.image}
                          alt={booking.carName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="font-medium">{booking.carName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{booking.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {booking.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">
                      ${booking.rentPrice}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">No recent activity</p>
        )}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, bgColor, change, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
            {change && (
              <p className="text-sm text-green-600 mt-1 font-medium">
                {change} from last month
              </p>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div
            className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0`}
          >
            {icon}
          </div>
        </div>
      </div>
      <div className={`${bgColor} h-2`}></div>
    </div>
  );
};

export default AdminDashboard;
