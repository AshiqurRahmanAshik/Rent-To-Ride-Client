import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Home from '../pages/Home';
import CarDetails from '../pages/CarDetails';
import MyBookings from '../pages/MyBookings';
import MyListings from '../pages/MyListings';
import AddCar from '../pages/AddCar';
import PrivateRoute from '../routes/PrivateRoute';
import ErrorPage from '../pages/ErrorPage';
import BrowseCars from '../pages/BrowseCars';
import SuccessStories from '../components/SuccessStories';
import UpdateProfile from '../pages/UpdateProfile';
import About from '../pages/About';
import Team from '../pages/Team';
import PrivacyPolicy from '../pages/PrivacyPolicy';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/browse-cars', element: <BrowseCars /> },
      { path: '/success-stories', element: <SuccessStories /> },
      { path: '/update-profile', element: <UpdateProfile /> },
      { path: '/about', element: <About /> },
      { path: '/team', element: <Team /> },
      { path: '/privacy', element: <PrivacyPolicy /> },

      // Car Details with loader
      {
        path: '/car/:id',
        element: <CarDetails />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/car/${params.id}`
            );
            if (!res.ok) {
              // Return null instead of throwing
              return null;
            }
            return res.json();
          } catch (err) {
            console.error(err);
            // IMPORTANT: Return null so the component can handle it
            return null;
          }
        },
      },

      // Private Routes
      {
        path: '/add-car',
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-listings',
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
