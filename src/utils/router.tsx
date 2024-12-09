import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import {
  Account,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Posts,
  ProductDetails,
  Register,
  ResetPassword,
} from '../routes';

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
        path: 'posts/:slug',
        element: <ProductDetails />,
      },
      {
        path: 'account',
        element: <Account />,
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
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
