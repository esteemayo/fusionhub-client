import { createSlice } from '@reduxjs/toolkit';

interface CommentModalState {
  isOpen: boolean;
  commentId: string;
  postId: string;
  replyId: string;
}

const initialState: CommentModalState = {
  isOpen: false,
  commentId: '',
  postId: '',
  replyId: '',
};

export const commentModalSlice = createSlice({
  name: 'commentModal',
  initialState,
  reducers: {
    reset: (state) => {
      state.commentId = '';
      state.postId = '';
      state.replyId = '';
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setCommentId: (state, { payload }) => {
      state.commentId = payload;
    },
    setPostId: (state, { payload }) => {
      state.postId = payload;
    },
    setReplyId: (state, { payload }) => {
      state.replyId = payload;
    },
  },
});

export const { onClose, onOpen, reset, setCommentId, setPostId, setReplyId } =
  commentModalSlice.actions;

export default commentModalSlice.reducer;
