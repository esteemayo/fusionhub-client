import { useQuery } from '@tanstack/react-query';

import { UserDetailType } from '../types';
import { getCurrentUser } from '../services/userService';

const fetchCurrentUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

export const useProfile = () => {
  const { isPending, error, data, refetch } = useQuery<UserDetailType>({
    queryKey: ['currentUser'],
    queryFn: () => fetchCurrentUser(),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};
