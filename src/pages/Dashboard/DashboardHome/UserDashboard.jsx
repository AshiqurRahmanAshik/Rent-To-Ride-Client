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
import { useAuth } from "../../../hooks/useAuth";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const UserDashboard = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://server-rent-to-go.vercel.app"; // Update with your API URL

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch overview
      const overviewRes = await axios.get(
        `${API_URL}/dashboard/user/${user.email}`
      );
      setOverview(overviewRes.data.overview);

      // Fetch statistics
      const statsRes = await axios.get(
        `${API_URL}/dashboard/user/${user.email}/stats`
      );
      setStats(statsRes.data);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
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
  const bookingsByCategoryData =
    stats?.bookingsByCategory?.map((item) => ({
      name: item._id,
      bookings: item.count,
    })) || [];

  const bookingsByMonthData =
    stats?.bookingsByMonth?.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
      bookings: item.count,
      amount: item.totalAmount,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your rentals
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Total Bookings"
          value={overview?.totalBookings || 0}
          icon="📅"
          bgColor="bg-blue-500"
        />
        <OverviewCard
          title="Active Bookings"
          value={overview?.activeBookings || 0}
          icon="🚗"
          bgColor="bg-green-500"
        />
        <OverviewCard
          title="My Cars"
          value={overview?.totalCars || 0}
          icon="🏎️"
          bgColor="bg-purple-500"
        />
        <OverviewCard
          title="Total Spent"
          value={`$${overview?.totalSpent || 0}`}
          icon="💰"
          bgColor="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings by Category - Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bookings by Category
          </h2>
          {bookingsByCategoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsByCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-10">
              No booking data available
            </p>
          )}
        </div>

        {/* Bookings Over Time - Line Chart */}
        {/* Bookings Over Time - Enhanced Line Chart */}
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg p-6 border border-indigo-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Booking Trends
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Monthly booking activity overview
              </p>
            </div>
            {bookingsByMonthData.length > 0 && (
              <div className="bg-indigo-100 px-4 py-2 rounded-lg">
                <p className="text-xs text-indigo-600 font-medium">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-indigo-700">
                  {bookingsByMonthData.reduce(
                    (sum, item) => sum + item.bookings,
                    0
                  )}
                </p>
              </div>
            )}
          </div>

          {bookingsByMonthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={340}>
              <LineChart
                data={bookingsByMonthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorBookings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <filter id="shadow" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e0e7ff"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />

                <YAxis
                  stroke="#6b7280"
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(value) => value.toLocaleString()}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    border: "2px solid #6366f1",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgb(99 102 241 / 0.3)",
                    padding: "12px 16px",
                  }}
                  labelStyle={{
                    color: "#1f2937",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    color: "#6366f1",
                    fontWeight: "500",
                  }}
                  cursor={{
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    strokeDasharray: "5 5",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  iconType="circle"
                />

                {/* Area fill under the line */}
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>

                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="url(#lineGradient)"
                  strokeWidth={4}
                  name="Bookings"
                  dot={{
                    fill: "#fff",
                    stroke: "#6366f1",
                    strokeWidth: 3,
                    r: 6,
                    filter: "url(#shadow)",
                  }}
                  activeDot={{
                    r: 9,
                    strokeWidth: 3,
                    stroke: "#fff",
                    fill: "#6366f1",
                    filter: "url(#shadow)",
                  }}
                  fill="url(#colorBookings)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <svg
                    className="w-10 h-10 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <p className="text-gray-600 font-semibold text-lg">
                No booking trends yet
              </p>
              <p className="text-gray-400 text-sm mt-2 max-w-xs text-center">
                Start accepting bookings to see your trends and growth over time
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Bookings
        </h2>
        {stats?.recentBookings && stats.recentBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Car
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
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.image}
                          alt={booking.carName}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <span className="font-medium">{booking.carName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{booking.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">
                      ${booking.rentPrice}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">No recent bookings</p>
        )}
      </div>
    </div>
  );
};

// Overview Card Component
const OverviewCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          </div>
          <div
            className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}
          >
            {icon}
          </div>
        </div>
      </div>
      <div className={`${bgColor} h-2`}></div>
    </div>
  );
};

export default UserDashboard;
