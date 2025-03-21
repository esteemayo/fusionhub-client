import { createSlice } from '@reduxjs/toolkit';

interface PostModalState {
  isOpen: boolean;
}

const initialState: PostModalState = {
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
