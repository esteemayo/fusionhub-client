import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/hooks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  return currentUser ? <Navigate to='/' /> : children;
};

export default ProtectedRoute;
