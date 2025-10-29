import { createSlice } from '@reduxjs/toolkit';

import { MuteModalType, MutePayload } from '../../types';

interface MuteModalState {
  isOpen: boolean;
}

const initialState: MuteModalState & MutePayload & MuteModalType = {
  isOpen: false,
  targetName: '',
  targetId: '',
  targetType: 'Comment',
  isMuted: false,
};

const muteModalSlice = createSlice({
  name: 'muteModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.targetId = payload.targetId;
      state.targetName = payload.targetName;
      state.targetType = payload.targetType;
      state.isMuted = payload.isMuted;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen, resetState } = muteModalSlice.actions;

export default muteModalSlice.reducer;
