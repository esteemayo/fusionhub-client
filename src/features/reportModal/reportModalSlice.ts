import { createSlice } from '@reduxjs/toolkit';

interface ReportModalState {
  isOpen: boolean;
  user: {
    id: string;
    username: string;
  };
  commentId?: string;
  replyId?: string;
}

const initialState: ReportModalState = {
  isOpen: false,
  user: {
    id: '',
    username: '',
  },
  commentId: '',
  replyId: '',
};

const reportModalSlice = createSlice({
  name: 'reportModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.user = payload;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setCommentId: (state, { payload }) => {
      state.commentId = payload;
    },
    setReplyId: (state, { payload }) => {
      state.replyId = payload;
    },
  },
});

export const { onClose, onOpen, resetState, setCommentId, setReplyId } =
  reportModalSlice.actions;

export default reportModalSlice.reducer;
