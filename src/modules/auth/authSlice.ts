import { createSlice } from "@reduxjs/toolkit";
import { signInAction, signUpAction } from "./authAsyncActions";
import { RootState } from "../../core/redux/store";
import { LoadState } from "../../core/redux/loadState";
import { User } from "../../api/auth/AuthDto";

interface AuthState {
  loading: LoadState;
  user?: User | null;
  errorAuth: string | undefined;
}

const initialState: AuthState = {
  loading: LoadState.needLoad,
  errorAuth: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
    getUser(state) {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
      state.loading = LoadState.idle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAction.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorAuth = "";
    });
    builder.addCase(signUpAction.fulfilled, (state, { payload }) => {
      state.loading = LoadState.idle;
      state.user = payload;
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorAuth = action.error.message;
    });
    builder.addCase(signInAction.pending, (state) => {
      state.loading = LoadState.pending;
      state.errorAuth = "";
    });
    builder.addCase(signInAction.fulfilled, (state, { payload }) => {
      state.loading = LoadState.idle;
      state.user = payload;
    });
    builder.addCase(signInAction.rejected, (state, action) => {
      state.loading = LoadState.idle;
      state.errorAuth = action.error.message;
    });
  },
});

export const { logout, getUser } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
