import { createSlice } from '@reduxjs/toolkit';

interface ShareModalState {
  isOpen: boolean;
}

const initialState: ShareModalState = {
  isOpen: false,
};

const shareModalSlice = createSlice({
  name: 'shareModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen, resetState } = shareModalSlice.actions;

export default shareModalSlice.reducer;
