import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { getCurrentUser } from '../services/userService';

const fetchCurrentUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

export const useProfile = () => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['me', currentUser?.details._id],
    queryFn: () => fetchCurrentUser(),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};
