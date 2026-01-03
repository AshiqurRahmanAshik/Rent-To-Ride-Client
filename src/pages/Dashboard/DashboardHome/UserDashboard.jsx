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

  const API_URL = "http://localhost:9000"; // Update with your API URL

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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Booking Trends
          </h2>
          {bookingsByMonthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsByMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-10">
              No trend data available
            </p>
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
