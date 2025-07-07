import { createSlice } from '@reduxjs/toolkit';

interface DeleteModalState {
  isOpen: boolean;
  postId: string | null;
  queryKey: 'articles' | 'likes' | 'dislikes';
}

const initialState: DeleteModalState = {
  isOpen: false,
  postId: null,
  queryKey: 'articles',
};

const deleteModalSlice = createSlice({
  name: 'deleteModal',
  initialState,
  reducers: {
    openDeleteModal: (state) => {
      state.isOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isOpen = false;
    },
    setDeletePostId: (state, { payload }) => {
      state.postId = payload;
      state.isOpen = true;
    },
    setQueryKey: (state, { payload }) => {
      state.queryKey = payload;
    },
  },
});

export const {
  closeDeleteModal,
  openDeleteModal,
  setDeletePostId,
  setQueryKey,
} = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
