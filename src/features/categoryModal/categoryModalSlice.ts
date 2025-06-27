import { createSlice } from '@reduxjs/toolkit';

interface CategoryModalState {
  isOpen: boolean;
  categoryId: string | null;
}

const initialState: CategoryModalState = {
  isOpen: false,
  categoryId: null,
};

const categoryModalSlice = createSlice({
  name: 'categoryModal',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    updateCategoryId: (state, { payload }) => {
      state.categoryId = payload;
    },
  },
});

export const { onClose, onOpen, updateCategoryId } = categoryModalSlice.actions;

export default categoryModalSlice.reducer;
