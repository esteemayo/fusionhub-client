import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/layouts/MainLayout';
import AccountLayout from '../components/layouts/accountLayout/AccountLayout';

import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

import {
  About,
  Articles,
  Categories,
  Contact,
  DislikedPosts,
  ForgotPassword,
  Home,
  LikedPosts,
  Login,
  NewsletterUnsubscribe,
  NotFound,
  PasswordSettings,
  Posts,
  PostDetails,
  Profile,
  ProfileSettings,
  Register,
  ResetPassword,
  SavedPosts,
  SubscriptionConfirmation,
  UnsubscribeConfirmation,
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
        path: 'post/:slug',
        element: <PostDetails />,
      },
      {
        path: 'accounts',
        element: <AccountLayout />,
        children: [
          {
            path: 'profile',
            element: (
              <AuthRoute>
                <Profile />
              </AuthRoute>
            ),
          },
          {
            path: 'profile-settings',
            element: (
              <AuthRoute>
                <ProfileSettings />
              </AuthRoute>
            ),
          },
          {
            path: 'password-settings',
            element: (
              <AuthRoute>
                <PasswordSettings />
              </AuthRoute>
            ),
          },
          {
            path: 'my-posts',
            element: (
              <AuthRoute>
                <Articles />
              </AuthRoute>
            ),
          },
          {
            path: 'saved-posts',
            element: (
              <AuthRoute>
                <SavedPosts />
              </AuthRoute>
            ),
          },
          {
            path: 'liked-posts',
            element: (
              <AuthRoute>
                <LikedPosts />
              </AuthRoute>
            ),
          },
          {
            path: 'disliked-posts',
            element: (
              <AuthRoute>
                <DislikedPosts />
              </AuthRoute>
            ),
          },
          {
            path: 'categories',
            element: (
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            ),
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
        path: 'newsletter/unsubscribe',
        element: <NewsletterUnsubscribe />,
      },
      {
        path: 'subscribe/confirm',
        element: <SubscriptionConfirmation />,
      },
      {
        path: 'unsubscribe/confirm',
        element: <UnsubscribeConfirmation />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
