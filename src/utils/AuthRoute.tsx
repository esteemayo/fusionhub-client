import LoadingToRedirect from './LoadingToRedirect';

import { useAppSelector } from '../hooks/hooks';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  return currentUser ? children : <LoadingToRedirect />;
};

export default AuthRoute;
