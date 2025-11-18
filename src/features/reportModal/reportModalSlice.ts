import { createSlice } from '@reduxjs/toolkit';

import { ReportModalPayload } from '../../types';

interface ReportModalState {
  isOpen: boolean;
}

const initialState: ReportModalState & ReportModalPayload = {
  isOpen: false,
  user: {
    id: '',
    username: '',
  },
  targetType: 'Comment',
  targetId: '',
};

const reportModalSlice = createSlice({
  name: 'reportModal',
  initialState,
  reducers: {
    resetState: () => initialState,
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.user = payload.user;
      state.targetType = payload.targetType;
      state.targetId = payload.targetId;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen, resetState } = reportModalSlice.actions;

export default reportModalSlice.reducer;
