import { createSlice } from '@reduxjs/toolkit';

import { MutePayload } from '../../types';

interface MuteModalState {
  isOpen: boolean;
  targetName?: string;
}

const initialState: MuteModalState & MutePayload = {
  isOpen: false,
  targetName: '',
  targetId: '',
  targetType: 'comment',
  action: 'mute',
};

const muteModalSlice = createSlice({
  name: 'muteModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.action = payload.action;
      state.targetId = payload.targetId;
      state.targetName = payload.targetName;
      state.targetType = payload.targetType;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen, resetState } = muteModalSlice.actions;

export default muteModalSlice.reducer;
