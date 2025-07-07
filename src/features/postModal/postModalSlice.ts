import { createSlice } from '@reduxjs/toolkit';

import { PostType } from '../../types';

interface PostModalState {
  isOpen: boolean;
  post: PostType | null;
  postId: string;
  queryKey: 'posts' | 'articles' | 'likes' | 'dislikes';
}

const initialState: PostModalState = {
  isOpen: false,
  post: null,
  postId: '',
  queryKey: 'posts',
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
    setPostQueryKey: (state, { payload }) => {
      state.queryKey = payload;
    },
  },
});

export const { onClose, onOpen, resetState, setPost, setPostQueryKey } =
  postModalSlice.actions;

export default postModalSlice.reducer;
