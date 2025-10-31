import { createSlice } from '@reduxjs/toolkit';

import { BlockPayload } from '../../types';

interface BlockModalState {
  isOpen: boolean;
}

const initialState: BlockModalState & BlockPayload = {
  isOpen: false,
  targetId: '',
  isBlocked: false,
};

const blockModalSlice = createSlice({
  name: 'blockModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.targetId = payload.targetId;
      state.isBlocked = payload.isBlocked;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen, resetState } = blockModalSlice.actions;

export default blockModalSlice.reducer;
