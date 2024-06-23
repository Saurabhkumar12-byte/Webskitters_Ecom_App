import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUp: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    checkAuthStatus: (state) => {
      state.loading = true;
    },
    checkAuthStatusSuccess: (state, action: PayloadAction<User | null>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    checkAuthStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  logout,
  checkAuthStatus,
  checkAuthStatusFailure,
  checkAuthStatusSuccess
} = authSlice.actions;

export default authSlice.reducer;
