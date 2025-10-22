import { createSlice } from '@reduxjs/toolkit';

import { MutePayload } from '../../types';

interface MuteModalState {
  isOpen: boolean;
}

const initialState: MuteModalState & MutePayload = {
  isOpen: false,
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
      state.targetId = payload.targetId;
      state.targetType = payload.targetType;
      state.action = payload.action;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen, resetState } = muteModalSlice.actions;

export default muteModalSlice.reducer;
