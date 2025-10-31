import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import { getBlockedUsers, toggleBlockUser } from '../services/userService';

import { BlockedUsersType, BlockUserData, IBlockedUsers } from '../types';

const fetchBlockedUsers = async () => {
  const { data } = await getBlockedUsers();
  return data;
};

const blockUser = async <T extends string, U extends BlockUserData>(
  userId: T,
  userData: U
) => {
  const { data } = await toggleBlockUser(userId, userData);
  return data;
};

export const useBlockedUsers: IBlockedUsers = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { data: blockedUsers } = useQuery<BlockedUsersType>({
    queryKey: ['blocked-users', currentUser],
    queryFn: fetchBlockedUsers,
    enabled: !!currentUser,
  });

  const blockUserMutation = useMutation({
    mutationFn: ({
      targetId,
      data,
    }: {
      targetId: string;
      data: BlockUserData;
    }) => blockUser(targetId, data),
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
    blockedUsers,
    blockUserMutation,
  };
};
