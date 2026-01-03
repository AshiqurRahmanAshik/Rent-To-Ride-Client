import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; // Adjust path

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ Auto-redirect to correct dashboard based on role
  useEffect(() => {
    if (user && location.pathname === "/dashboard") {
      if (user.role === "admin") {
        navigate("/dashboard/admin", { replace: true });
      }
      // User dashboard is already at /dashboard (index route)
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  // Role-based menu items
  const userMenuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: "🏠" },
    { name: "My Bookings", path: "/dashboard/my-bookings", icon: "📅" },
    { name: "My Cars", path: "/dashboard/my-cars", icon: "🚗" },
    { name: "Add Car", path: "/dashboard/add-car", icon: "➕" },
  ];

  const adminMenuItems = [
    { name: "Dashboard Home", path: "/dashboard/admin", icon: "🏠" },
    { name: "Manage Users", path: "/dashboard/manage-users", icon: "👥" },
    { name: "Manage Cars", path: "/dashboard/manage-cars", icon: "🚙" },
    { name: "Manage Bookings", path: "/dashboard/manage-bookings", icon: "📊" },
  ];

  const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link to="/" className="text-xl font-bold text-blue-600">
              🚗 Rent to Ride
            </Link>
          </div>

          {/* Right side - User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">
                  {user?.displayName || user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "user"}
                </p>
              </div>
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt={user?.displayName || user?.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/update-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  👤 Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  🏠 Dashboard Home
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  🏡 Go to Home
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:static lg:translate-x-0 left-0 top-16 bottom-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {user?.role === "admin" ? "👑 Admin Panel" : "📊 My Dashboard"}
            </h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  onClick={() =>
                    window.innerWidth < 1024 && setSidebarOpen(false)
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Info at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt={user?.displayName || user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.displayName || user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
