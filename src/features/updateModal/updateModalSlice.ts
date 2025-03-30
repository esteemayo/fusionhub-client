import { createSlice } from '@reduxjs/toolkit';

interface UpdateModalState {
  isOpen: boolean;
}

const initialState: UpdateModalState = {
  isOpen: false,
};

const updateModal = createSlice({
  name: 'updateModal',
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

export const { onClose, onOpen } = updateModal.actions;

export default updateModal.reducer;
