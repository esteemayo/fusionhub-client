import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import { Home, Login, NotFound, Posts, Register } from '../routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
