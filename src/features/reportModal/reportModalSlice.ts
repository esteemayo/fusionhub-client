import { createSlice } from '@reduxjs/toolkit';

interface ReportModalState {
  isOpen: boolean;
  username: string;
}

const initialState: ReportModalState = {
  isOpen: false,
  username: '',
};

const reportModalSlice = createSlice({
  name: 'reportModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.username = payload;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = reportModalSlice.actions;

export default reportModalSlice.reducer;
