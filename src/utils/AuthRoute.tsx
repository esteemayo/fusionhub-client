import LoadingToRedirect from './LoadingToRedirect';

import { useAppSelector } from '../hooks/hooks';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  if (currentUser) {
    return children;
  } else {
    return <LoadingToRedirect />;
  }
};

export default AuthRoute;
