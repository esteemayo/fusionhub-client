import { useQuery } from '@tanstack/react-query';

import { UserDetailType } from '../types';
import { getCurrentUser, getUserByUsername } from '../services/userService';

const fetchCurrentUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

const fetchUserByUsername = async (username: string) => {
  const { data } = await getUserByUsername(username);
  return data;
};

export const useProfile = (username?: string) => {
  const { isPending, error, data, refetch } = useQuery<UserDetailType>({
    queryKey: ['currentUser'],
    queryFn: () => fetchCurrentUser(),
  });

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: userData,
  } = useQuery<UserDetailType>({
    queryKey: ['user'],
    queryFn: () => fetchUserByUsername(username as string),
    enabled: !!username,
  });

  return {
    isPending,
    isPendingUser,
    error,
    errorUser,
    data,
    userData,
    refetch,
  };
};
