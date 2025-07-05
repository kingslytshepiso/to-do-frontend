/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import AppIcon from "@/modules/shared/components/app-icon";
import FormControl from "@/modules/shared/components/forms/form-control";
import { TextBox } from "@/modules/shared/components/forms/text-box";
import LoadingButton from "@/modules/shared/components/loading-button";
import { useLoading } from "@/modules/shared/hooks/loading-context";
import { useNotification } from "@/modules/shared/hooks/notification-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import GoogleAuthButton from "../components/google-auth-button";
import { useAuth } from "../hooks/auth-context";
import { LoginInput } from "../types/login-input";

type FormSummary = {
  message: string;
  status: "error" | "success" | "info";
};
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const [formSummary, setFormSummary] = useState<FormSummary>();
  const router = useRouter();
  const { addNotification } = useNotification();
  const { startLoading, stopLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginInput> = async (formData) => {
    const loadingId = "login-form";
    startLoading(loadingId, "Logging in...");

    try {
      const response = await login(formData);
      if (response) {
        setFormSummary({
          message: response.message,
          status: "success",
        });
        router.push("/");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setFormSummary({
        message: errorMessage,
        status: "error",
      });
    } finally {
      stopLoading(loadingId);
    }
  };

  const postFederatedLogin = (result: FormSummary) => {
    if (result.status == "error") {
      addNotification(result.message, result.status);
    } else {
      addNotification(result.message, result.status);
      router.push("/");
    }
  };

  useEffect(
    function updateNotification() {
      if (formSummary) addNotification(formSummary.message, formSummary.status);
    },
    [formSummary]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-row justify-center">
        <AppIcon size={200} />
      </div>
      <TextBox
        label="Username"
        {...register("username")}
        type="text"
        placeholder="Enter your username"
        error={errors.username}
      />
      <TextBox
        label="Password"
        {...register("password")}
        placeholder="Enter your password"
        type="password"
        error={errors.password}
      />
      <FormControl>
        <LoadingButton loadingId="login-form" variant="primary" type="submit">
          Login
        </LoadingButton>
      </FormControl>
      <GoogleAuthButton type="login" onFinish={postFederatedLogin} />
    </form>
  );
}
