import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authKey, getStorage, removeStorage, setStorage } from '../../utils';
import { login, logout, register } from '../../services/authService';

import { CurrentUserType } from '../../types';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...credentials });
      console.log(data);
      return data;
    } catch (err: unknown) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await login({ ...credentials });
      toast.success('Access Granted!');
      return data;
    } catch (err: unknown) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      return;
    } catch (err: unknown) {
      return rejectWithValue(err.response.data);
    }
  }
);

interface AuthState {
  user: CurrentUserType | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const user: CurrentUserType = getStorage(authKey);

const initialState: AuthState = {
  user: user ?? null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload.message;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        removeStorage(authKey);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload.message;
      });
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
