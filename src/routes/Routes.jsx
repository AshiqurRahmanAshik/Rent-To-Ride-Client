import { createBrowserRouter } from 'react-router';
import Root from '../layouts/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
]);
