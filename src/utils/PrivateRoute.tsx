import { Navigate } from 'react-router-dom';

import LoadingToRedirect from './LoadingToRedirect';

import { useAppSelector } from '../hooks/hooks';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  if (currentUser && currentUser.role === 'admin') {
    return children;
  } else if (currentUser && currentUser.role === 'user') {
    return <Navigate to='/accounts/profile' />;
  } else {
    return <LoadingToRedirect />;
  }
};

export default PrivateRoute;
