import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { getBlockedUsers, toggleBlockUser } from '../services/userService';

import { BlockedUsersType, IBlockedUsers } from '../types';

const fetchBlockedUsers = async () => {
  const { data } = await getBlockedUsers();
  return data;
};

const blockUser = async (userId: string, reason: string) => {
  const { data } = await toggleBlockUser(userId, reason);
  return data;
};

export const useBlockedUsers: IBlockedUsers = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const {
    isPending,
    error,
    data: blockedUsers,
  } = useQuery<BlockedUsersType>({
    queryKey: ['blocked-users', currentUser],
    queryFn: fetchBlockedUsers,
    enabled: !!currentUser,
  });

  const blockUserMutation = useMutation({
    mutationFn: ({ targetId, reason }: { targetId: string; reason: string }) =>
      blockUser(targetId, reason),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['blocked-users', currentUser],
      });
      toast.success(data.message);
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred');
      }
    },
  });

  return {
    isPending,
    error,
    blockedUsers,
    blockUserMutation,
  };
};
