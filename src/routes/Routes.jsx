import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Home from '../pages/Home';
import CarDetails from '../pages/CarDetails';
import MyBookings from '../pages/MyBookings';
import MyListings from '../pages/MyListings';
import AddCar from '../pages/AddCar';
import PrivateRoute from '../routes/PrivateRoute'; // add this
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },

      // Car Details with loader
      {
        path: '/car/:id',
        element: <CarDetails />,
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/car/${params.id}`
            );
            if (!res.ok) throw new Error('Failed to fetch car');
            return res.json();
          } catch (err) {
            console.error(err);
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
        path: '/my-listing',
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
