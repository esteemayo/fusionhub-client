import { createSlice } from '@reduxjs/toolkit';

interface postActionMenuState {
  isOpen: boolean;
}

const initialState: postActionMenuState = {
  isOpen: false,
};

const postActionMenu = createSlice({
  name: 'postActionMenu',
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

export const { onClose, onOpen, onToggle } = postActionMenu.actions;

export default postActionMenu.reducer;
