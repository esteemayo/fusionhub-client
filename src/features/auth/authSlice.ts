import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from '../../services/authService';
import * as userAPI from '../../services/userService';

import { authKey, getStorage, removeStorage, setStorage } from '../../utils';

import {
  AuthCrendentialType,
  AuthState,
  CurrentUserType,
  ErrorPayload,
  RegisterUserType,
  UpdatePasswordType,
  UpdateUserDataType,
} from '../../types';

const user: CurrentUserType = getStorage(authKey);

const initialState: AuthState = {
  user: user ?? null,
  name: '',
  isLoading: false,
  isPending: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.register({ ...userData });
      toast.success('Your account has been successfully created!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: AuthCrendentialType, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      toast.success('Login successful! Welcome back!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  'auth/google',
  async (credentials: object, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.googleLogin({ ...credentials });
      toast.success('You have successfully logged in with Google!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      toast.success('You have successfully logged out. See you again soon!');
      return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  'auth/password',
  async (credentials: UpdatePasswordType, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.updatePassword({ ...credentials });
      toast.success('Your password has been successfully updated!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/data',
  async (userData: UpdateUserDataType, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.updateCurrentUser({ ...userData });
      toast.success('Your profile has been successfully updated!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'user/deactivate',
  async (_, { rejectWithValue }) => {
    try {
      await userAPI.deleteCurrentUser();
      toast.success(
        'Your account has been successfully deactivated. We hope to see you again!'
      );
      return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const removeAvatar = createAsyncThunk(
  'user/avatar',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.deleteUserImage();
      toast.success('Your profile image has been successfully removed!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

export const removeBanner = createAsyncThunk(
  'user/banner',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.deleteUserBanner();
      toast.success('Your profile banner has been successfully removed!');
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorResponse = (err as ErrorPayload)?.response?.data;

        return rejectWithValue(
          errorResponse || { message: 'Something went wrong!' }
        );
      }

      return rejectWithValue({ message: 'Something went wrong!' });
    }
  }
);

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
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.name = payload.details.name;
        state.isSuccess = true;
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
        state.isLoading = false;
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
        state.user = null;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.isPending = true;
      })
      .addCase(googleLoginUser.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(googleLoginUser.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        removeStorage(authKey);
        state.isSuccess = true;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(updateUserPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        removeStorage(authKey);
        state.isSuccess = true;
      })
      .addCase(deleteAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      })
      .addCase(removeAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAvatar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(removeAvatar.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      })
      .addCase(removeBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeBanner.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(removeBanner.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = (payload as { message: string }).message;
      });
  },
});

export const { resetState, resetUser } = authSlice.actions;

export default authSlice.reducer;
