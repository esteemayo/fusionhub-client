import { createSlice } from '@reduxjs/toolkit';

interface postMenuActionsState {
  isOpen: boolean;
}

const initialState: postMenuActionsState = {
  isOpen: false,
};

const postMenuActions = createSlice({
  name: 'postMenuActions',
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

export const { onClose, onOpen, onToggle } = postMenuActions.actions;

export default postMenuActions.reducer;
