import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import * as authAPI from '../../services/authService';
import * as userAPI from '../../services/userService';

import {
  authKey,
  cookieName,
  getStorage,
  removeStorage,
  setStorage,
} from '../../utils';

import {
  AuthCrendentialType,
  AuthState,
  CurrentUserType,
  ErrorPayload,
  RegisterUserType,
  UpdatePasswordType,
  UpdateUserDataType,
} from '../../types';

const token = Cookie.get(cookieName);
const user: CurrentUserType = getStorage(authKey);

const initialState: AuthState = {
  user: user ?? null,
  name: '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

if (token) {
  const decodedToken = jwtDecode(token) as CurrentUserType & { exp: number };
  const expiryTime = new Date().getTime();

  if (decodedToken.exp * 1000 < expiryTime) {
    removeStorage(authKey);
    Cookie.remove(cookieName);

    initialState.user = null;
  }
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserType, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.register({ ...userData });
      toast.success('Account Created!');
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
      toast.success('Access Granted!');
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
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.googleLogin(email);
      toast.success('Access Granted!');
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
      toast.success('Account Logged Out!');
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
      toast.success('Password Updated!');
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
      toast.success('Profile Updated!');
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
      toast.success('Account De-activated!');
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
      toast.success('Image Removed!');
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
      toast.success('Banner Removed!');
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
        state.isLoading = true;
      })
      .addCase(googleLoginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        setStorage(authKey, payload);
        state.isSuccess = true;
      })
      .addCase(googleLoginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
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

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
