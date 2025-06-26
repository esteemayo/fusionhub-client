import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { UserType } from '../types';
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
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isPending, error, data, refetch } = useQuery<UserType>({
    queryKey: ['currentUser'],
    queryFn: () => fetchCurrentUser(),
    enabled: !!currentUser,
  });

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: userData,
  } = useQuery<UserType>({
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
