import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegistrationForm } from "./components/RegistrationForm";
import { useAppDispatch } from "../../../core/redux/store";
import { signUpAction } from "../authAsyncActions";
import { RegisterParams } from "../../../api/auth/AuthDto";
import { authSelector } from "../authSlice";
import { pathList } from "../../../routers/pathList";
import { AuthLayout } from "../../../common/components/layouts/AuthLayout";
import layer2 from "../../../assets/images/register-bg.png";
import { LoadingBackdrop } from "../../../common/components/LoadingBackdrop";
import { LoadState } from "../../../core/redux/loadState";
import { Notification } from "../../../common/components/Notification";

export interface RegisterValues extends RegisterParams {
  password_repeat: string;
  terms: boolean;
}

export const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const { user, loading, errorAuth } = useSelector(authSelector);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, errors, watch } = useForm<RegisterValues>({
    mode: "onBlur",
  });

  useEffect(() => {
    user && push(pathList.content.teams);
  }, [user, push]);

  const watchFields = watch(["password", "terms"]);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSubmit = handleSubmit(async (registerValues) => {
    const { userName, login, password } = registerValues;

    dispatch(signUpAction({ userName, login, password }));
  });

  return (
    <AuthLayout titleText="Sign Up" img={layer2}>
      <LoadingBackdrop loading={loading === LoadState.pending}>
        <Notification error={errorAuth} />
        <RegistrationForm
          errors={errors}
          register={register}
          onSubmit={handleFormSubmit}
          showPassword={showPassword}
          onShowPassword={handleShowPassword}
          watchFields={watchFields}
        />
      </LoadingBackdrop>
    </AuthLayout>
  );
};
