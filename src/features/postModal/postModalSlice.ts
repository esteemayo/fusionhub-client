import { createSlice } from '@reduxjs/toolkit';

interface postModalState {
  isOpen: boolean;
}

const initialState: postModalState = {
  isOpen: false,
};

const postModalSlice = createSlice({
  name: 'postModal',
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

export const { onClose, onOpen } = postModalSlice.actions;

export default postModalSlice.reducer;
