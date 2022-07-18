import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginParams, RegisterParams, User } from "../../api/auth/AuthDto";
import { authServices } from "../../api/auth/authServices";

export const signUpAction = createAsyncThunk<User, RegisterParams>(
  "auth/signUp",

  async ({ userName, login, password }) => {
    const registerData = await authServices.register({
      userName,
      login,
      password,
    });
    localStorage.setItem("user", JSON.stringify(registerData));
    return registerData;
  }
);

export const signInAction = createAsyncThunk<User, LoginParams>(
  "auth/signIn",

  async (loginParams) => {
    const loginData = await authServices.login(loginParams);
    localStorage.setItem("user", JSON.stringify(loginData));
    return loginData;
  }
);
