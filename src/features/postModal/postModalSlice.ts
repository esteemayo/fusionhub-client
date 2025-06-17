import { createSlice } from '@reduxjs/toolkit';

import { PostType } from '../../types';

interface PostModalState {
  isOpen: boolean;
  post: PostType | null;
  postId: string;
}

const initialState: PostModalState = {
  isOpen: false,
  post: null,
  postId: '',
};

const postModalSlice = createSlice({
  name: 'postModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    setPost: (state, { payload }: { payload: PostType }) => {
      state.post = payload;
      state.postId = payload._id;
    },
  },
});

export const { onClose, onOpen, resetState, setPost } = postModalSlice.actions;

export default postModalSlice.reducer;
