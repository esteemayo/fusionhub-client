import { createSlice } from '@reduxjs/toolkit';

interface ShareModalState {
  isOpen: boolean;
  url: string;
  text?: string;
  title?: string;
}

const initialState: ShareModalState = {
  isOpen: false,
  url: '',
  text: '',
  title: '',
};

const shareModalSlice = createSlice({
  name: 'shareModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.url = payload.url;
      state.text = payload.text;
      state.title = payload.title;
    },
    onClose: (state) => {
      state.isOpen = false;
      state.url = '';
      state.text = '';
      state.title = '';
    },
  },
});

export const { onClose, onOpen, resetState } = shareModalSlice.actions;

export default shareModalSlice.reducer;
