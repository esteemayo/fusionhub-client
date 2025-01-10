import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import AccountLayout from '../components/layouts/accountLayout/AccountLayout';

import {
  Account,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Posts,
  PostDetails,
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
        element: <PostDetails />,
      },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          {
            path: '',
            element: <Account />,
          },
        ],
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
