import { post } from "../baseFetch";
import { RegisterParams, LoginParams } from "./AuthDto";

const register = async (params: RegisterParams) => {
  return post("api/Auth/SignUp", JSON.stringify(params));
};

const login = async (params: LoginParams) => {
  return post("api/Auth/SignIn", JSON.stringify(params));
};

export const authServices = {
  login,
  register,
};
