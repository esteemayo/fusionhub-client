import { createSlice } from '@reduxjs/toolkit';

interface ImageModalState {
  isOpen: boolean;
}

const initialState: ImageModalState = {
  isOpen: false,
};

const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = imageModalSlice.actions;

export default imageModalSlice.reducer;
