import { createSlice } from '@reduxjs/toolkit';

interface AccountModalState {
  isOpen: boolean;
}

const initialState: AccountModalState = {
  isOpen: false,
};

export const accountModalSlice = createSlice({
  name: 'accountModal',
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

export const { onClose, onOpen } = accountModalSlice.actions;

export default accountModalSlice.reducer;
