import { useQuery } from '@tanstack/react-query';

import { IProfile, UserType } from '../types';
import { useAppSelector } from './hooks';
import { getCurrentUser, getUserByUsername } from '../services/userService';

const fetchCurrentUser = async () => {
  const { data } = await getCurrentUser();
  return data;
};

const fetchUserByUsername = async (username: string) => {
  const { data } = await getUserByUsername(username);
  return data;
};

export const useProfile: IProfile = (username) => {
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { isPending, error, data, refetch } = useQuery<UserType>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    enabled: !!currentUser,
  });

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: userData,
    refetch: refetchUser,
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
    refetchUser,
  };
};
