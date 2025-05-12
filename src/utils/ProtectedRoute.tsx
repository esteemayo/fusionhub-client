import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/hooks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  if (currentUser) {
    return <Navigate to='/' />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
