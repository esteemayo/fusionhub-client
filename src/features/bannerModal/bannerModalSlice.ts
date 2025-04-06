import { createSlice } from '@reduxjs/toolkit';

interface BannerModalState {
  isOpen: boolean;
}

const initialState: BannerModalState = {
  isOpen: false,
};

const bannerModalSlice = createSlice({
  name: 'bannerModal',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = bannerModalSlice.actions;

export default bannerModalSlice.reducer;
