import { createSlice } from '@reduxjs/toolkit';

interface CommentModalState {
  isOpen: boolean;
  commentId: string;
}

const initialState: CommentModalState = {
  isOpen: false,
  commentId: '',
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
    setCommentId: (state, { payload }) => {
      state.commentId = payload;
    },
  },
});

export const { onClose, onOpen, setCommentId } = commentModalSlice.actions;

export default commentModalSlice.reducer;
