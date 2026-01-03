import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Home from "../pages/Home";
import CarDetails from "../pages/CarDetails";
import MyBookings from "../pages/MyBookings";
import MyListings from "../pages/MyListings";
import AddCar from "../pages/AddCar";
import PrivateRoute from "../routes/PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import BrowseCars from "../pages/BrowseCars";
import SuccessStories from "../components/SuccessStories";
import UpdateProfile from "../pages/UpdateProfile";
import About from "../pages/About";
import Team from "../pages/Team";
import PrivacyPolicy from "../pages/PrivacyPolicy";

// ✅ Dashboard imports - Add these
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/Dashboard/DashboardHome/UserDashboard";
import AdminDashboard from "../pages/Dashboard/DashboardHome/AdminDashboard";
import MyCars from "../pages/Dashboard/MyCars/MyCars";
import DashboardAddCar from "../pages/Dashboard/MyCars/AddCar";
import EditCar from "../pages/Dashboard/MyCars/EditCar";
import DashboardMyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCars from "../pages/Dashboard/Admin/ManageCars";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/browse-cars", element: <BrowseCars /> },
      { path: "/success-stories", element: <SuccessStories /> },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/about", element: <About /> },
      { path: "/team", element: <Team /> },
      { path: "/privacy", element: <PrivacyPolicy /> },

      // Car Details with loader
      {
        path: "/car/:id",
        element: <CarDetails />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/car/${params.id}`
            );
            if (!res.ok) {
              return null;
            }
            return res.json();
          } catch (err) {
            console.error(err);
            return null;
          }
        },
      },

      // Private Routes (Keep for backward compatibility)
      {
        path: "/add-car",
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ✅ Dashboard Routes - Add this entire section
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserDashboard />, // Default to user dashboard
      },
      {
        path: "admin",
        element: <AdminDashboard />, // Explicit admin route
      },
      {
        path: "my-cars",
        element: <MyCars />,
      },
      {
        path: "add-car",
        element: <DashboardAddCar />,
      },
      {
        path: "edit-car/:id",
        element: <EditCar />,
      },
      {
        path: "my-bookings",
        element: <DashboardMyBookings />,
      },
      // Admin routes
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-cars",
        element: <ManageCars />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
    ],
  },
]);
