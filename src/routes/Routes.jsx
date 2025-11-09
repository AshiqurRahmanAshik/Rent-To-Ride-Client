import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Home from '../pages/Home';
import CarDetails from '../pages/CarDetails';
import MyBookings from '../pages/MyBookings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/car/:id',
        element: <CarDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/car/${params.id}`),
      },
      { path: '/my-bookings', element: <MyBookings /> },
    ],
  },
]);
