import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../core/redux/store";
import { authSelector } from "../authSlice";
import { LoginForm } from "./components/LoginForm";
import { signInAction } from "../authAsyncActions";
import { LoginParams } from "../../../api/auth/AuthDto";
import { pathList } from "../../../routers/pathList";
import { LoadingBackdrop } from "../../../common/components/LoadingBackdrop";
import { LoadState } from "../../../core/redux/loadState";
import { AuthLayout } from "../../../common/components/layouts/AuthLayout";
import layer1 from "../../../assets/images/login-bg.png";
import { Notification } from "../../../common/components/Notification";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const { user, loading, errorAuth } = useSelector(authSelector);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<LoginParams>({
    mode: "onBlur",
  });

  useEffect(() => {
    user && push(pathList.content.teams);
  }, [user, push]);

  const onClickIcon = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = handleSubmit((loginValues) => {
    dispatch(signInAction(loginValues));
  });

  return (
    <>
      <Notification error={errorAuth} />
      <AuthLayout titleText="Sign In" img={layer1}>
        <LoadingBackdrop loading={loading === LoadState.pending}>
          <LoginForm
            errors={errors}
            register={register}
            onSubmit={onSubmit}
            showPassword={showPassword}
            onClickIcon={onClickIcon}
          />
        </LoadingBackdrop>
      </AuthLayout>
    </>
  );
};
