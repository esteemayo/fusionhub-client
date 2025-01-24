import { createSlice } from '@reduxjs/toolkit';

interface AccountMenuState {
  isOpen: boolean;
}

const initialState: AccountMenuState = {
  isOpen: false,
};

export const accountMenuSlice = createSlice({
  name: 'accountMenu',
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

export const { onClose, onOpen, onToggle } = accountMenuSlice.actions;

export default accountMenuSlice.reducer;
