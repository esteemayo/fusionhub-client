import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IMute, MutedListType, MutePayload } from '../types';
import { useAppSelector } from './hooks';
import { getMutedEntity, muteEntity } from '../services/muteService';

const fetchMutedEntity = async () => {
  const { data } = await getMutedEntity();
  return data;
};

const createMuteEntity = async (payload: MutePayload) => {
  const { data } = await muteEntity(payload);
  return data;
};

export const useMute: IMute = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const { data: mutedList } = useQuery<MutedListType>({
    queryKey: ['mutedList', currentUser],
    queryFn: fetchMutedEntity,
    enabled: !!currentUser,
  });

  const muteMutation = useMutation({
    mutationFn: (payload: MutePayload) => createMuteEntity(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['mutedList', currentUser] });
      toast.success(data.message as string);
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
    mutedList,
    muteMutation,
  };
};
