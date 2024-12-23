import { createSlice } from '@reduxjs/toolkit';

interface PostsMenuState {
  isOpen: boolean;
}

const initialState: PostsMenuState = {
  isOpen: false,
};

const postsMenu = createSlice({
  name: 'postsMenu',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    onToggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { onClose, onOpen, onToggle } = postsMenu.actions;

export default postsMenu.reducer;
