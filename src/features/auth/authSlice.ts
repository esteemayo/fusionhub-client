import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login, logout, register } from '../../services/authService';
import { authKey, getStorage, removeStorage, setStorage } from '../../utils';

import {
  AuthCrendentialType,
  CurrentUserType,
  RegisterUserType,
} from '../../types';

interface AuthState {
  user: CurrentUserType | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const { data } = await register({ ...userData });
      console.log(data);
      toast.success('Account created!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({ message: err.message });
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { credentials }: { credentials: AuthCrendentialType },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await login({ ...credentials });
      toast.success('Access Granted!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({ message: err.message });
      }

      return rejectWithValue({ message: 'Something went wrong!' });
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
      if (err instanceof Error) {
        return rejectWithValue({ message: err.message });
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

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
        state.message = (payload as { message: string }).message;
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
        state.message = (payload as { message: string }).message;
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
        state.message = (payload as { message: string }).message;
      });
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
