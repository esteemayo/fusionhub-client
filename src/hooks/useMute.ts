import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from './hooks';
import * as muteAPI from '../services/muteService';

import { IMute, MutedListType, MutePayload, UnmutePayload } from '../types';

const fetchMutedEntity = async () => {
  const { data } = await muteAPI.getMutedEntities();
  return data;
};

const createMuteTarget = async (payload: MutePayload) => {
  const { data } = await muteAPI.muteTarget(payload);
  return data;
};

const createUnmuteTarget = async (payload: UnmutePayload) => {
  const { data } = await muteAPI.unmuteTarget(payload);
  return data;
};

export const useMute: IMute = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAppSelector((state) => ({ ...state.auth }));

  const {
    isPending,
    error,
    data: mutedList,
  } = useQuery<MutedListType>({
    queryKey: ['mutedList', currentUser],
    queryFn: fetchMutedEntity,
    enabled: !!currentUser,
  });

  const muteMutation = useMutation({
    mutationFn: (payload: MutePayload) => createMuteTarget(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mutedList', currentUser] });
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

  const unmuteMutation = useMutation({
    mutationFn: (payload: UnmutePayload) => createUnmuteTarget(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mutedList', currentUser] });
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
    mutedList,
    muteMutation,
    unmuteMutation,
  };
};
