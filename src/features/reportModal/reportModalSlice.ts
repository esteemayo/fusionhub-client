import { createSlice } from '@reduxjs/toolkit';

interface ReportModalState {
  isOpen: boolean;
}

const initialState: ReportModalState = {
  isOpen: false,
};

const reportModalSlice = createSlice({
  name: 'reportModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = reportModalSlice.actions;

export default reportModalSlice.reducer;
