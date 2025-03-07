import { createSlice } from '@reduxjs/toolkit';

interface CommentModalState {
  isOpen: boolean;
}

const initialState: CommentModalState = {
  isOpen: false,
};

export const commentModalSlice = createSlice({
  name: 'commentModal',
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

export const { onClose, onOpen } = commentModalSlice.actions;

export default commentModalSlice.reducer;
