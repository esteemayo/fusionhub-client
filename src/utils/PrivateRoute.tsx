import { Navigate } from 'react-router-dom';

import LoadingToRedirect from './LoadingToRedirect';

import { useAppSelector } from '../hooks/hooks';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  if (!currentUser) {
    return <LoadingToRedirect />;
  }

  if (currentUser.role === 'admin') {
    return children;
  }

  if (currentUser.role === 'user') {
    return <Navigate to='/accounts/profile' />;
  }

  return <Navigate to='/' />;
};

export default PrivateRoute;
