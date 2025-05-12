import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import AccountLayout from '../components/layouts/accountLayout/AccountLayout';

import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

import {
  About,
  Articles,
  Contact,
  DislikedPosts,
  ForgotPassword,
  Home,
  LikedPosts,
  Login,
  NotFound,
  PasswordSettings,
  Posts,
  PostDetails,
  Profile,
  ProfileSettings,
  Register,
  ResetPassword,
  SavedPosts,
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
        path: 'accounts',
        element: (
          <AuthRoute>
            <AccountLayout />
          </AuthRoute>
        ),
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'profile-settings',
            element: <ProfileSettings />,
          },
          {
            path: 'password-settings',
            element: <PasswordSettings />,
          },
          {
            path: 'my-posts',
            element: <Articles />,
          },
          {
            path: 'saved-posts',
            element: <SavedPosts />,
          },
          {
            path: 'liked-posts',
            element: <LikedPosts />,
          },
          {
            path: 'disliked-posts',
            element: <DislikedPosts />,
          },
        ],
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reset-password/:token',
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
