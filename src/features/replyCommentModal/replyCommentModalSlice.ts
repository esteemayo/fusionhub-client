import { createSlice } from '@reduxjs/toolkit';

interface ReplyCommentModalState {
  isOpen: boolean;
  isEditing: boolean;
  content: string;
  commentId: string;
  postId: string;
  replyId: string;
  userId: string;
}

const initialState: ReplyCommentModalState = {
  isOpen: false,
  isEditing: false,
  content: '',
  commentId: '',
  postId: '',
  replyId: '',
  userId: '',
};

const replyCommentModalSlice = createSlice({
  name: 'replyCommentModal',
  initialState,
  reducers: {
    reset: (state) => {
      state.isEditing = false;
      state.content = '';
      state.commentId = '';
      state.replyId = '';
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setIsEditing: (state) => {
      state.isEditing = true;
    },
    setContent: (state, { payload }) => {
      state.content = payload;
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
    setUserId: (state, { payload }) => {
      state.userId = payload;
    },
  },
});

export const {
  onClose,
  onOpen,
  reset,
  setCommentId,
  setContent,
  setIsEditing,
  setPostId,
  setReplyId,
  setUserId,
} = replyCommentModalSlice.actions;

export default replyCommentModalSlice.reducer;
