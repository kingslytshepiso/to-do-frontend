/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import AppIcon from "@/modules/shared/components/app-icon";
import FormControl from "@/modules/shared/components/forms/form-control";
import { TextBox } from "@/modules/shared/components/forms/text-box";
import LoadingButton from "@/modules/shared/components/loading-button";
import { useNotification } from "@/modules/shared/hooks/notification-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import AuthErrorDisplay from "../components/auth-error-display";
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
  const router = useRouter();
  const { addNotification } = useNotification();
  const { login, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInput> = async (formData) => {
    try {
      const response = await login(formData);
      if (response && response.authStatus === "AUTHENTICATED") {
        addNotification("Login successful! Redirecting...", "success");
        router.push("/");
      }
    } catch (error) {
      // Error is already handled by the auth context
      // Just show a generic notification
      addNotification("Login failed. Please try again.", "error");
    }
  };

  const postFederatedLogin = (result: FormSummary) => {
    if (result.status === "error") {
      addNotification(result.message, result.status);
    } else {
      addNotification(result.message, result.status);
      router.push("/");
    }
  };

  // Clear auth errors when form is submitted
  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="w-full flex flex-row justify-center">
        <AppIcon size={200} />
      </div>

      {/* Display auth errors */}
      <AuthErrorDisplay />

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
