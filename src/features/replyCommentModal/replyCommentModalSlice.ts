import { createSlice } from '@reduxjs/toolkit';

interface ReplyCommentModalState {
  isOpen: boolean;
  commentId: string;
  postId: string;
  userId: string;
}

const initialState: ReplyCommentModalState = {
  isOpen: false,
  commentId: '',
  postId: '',
  userId: '',
};

const replyCommentModalSlice = createSlice({
  name: 'replyCommentModal',
  initialState,
  reducers: {
    reset: (state) => {
      state.commentId = '';
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
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
  },
});

export const { onClose, onOpen, reset, setCommentId, setPostId, setUserId } =
  replyCommentModalSlice.actions;

export default replyCommentModalSlice.reducer;
