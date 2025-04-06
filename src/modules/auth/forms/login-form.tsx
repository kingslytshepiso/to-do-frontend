/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import AppIcon from "@/modules/shared/components/app-icon";
import { TextBox } from "@/modules/shared/components/forms/text-box";
import Button from "@/modules/shared/components/button";
import FormControl from "@/modules/shared/components/forms/form-control";
import { useNotification } from "@/modules/shared/hooks/notification-context";
import { useRouter } from "next/navigation";
import { LoginInput } from "../types/login-input";
import { useAuth } from "../hooks/auth-context";
import GoogleLoginButton from "../components/google-login-button";

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
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });
  const { login } = useAuth();
  const onSubmit: SubmitHandler<LoginInput> = async (formData) => {
    try {
      const response = await login(formData);
      console.log({ response });
      if (response) {
        setFormSummary({
          message: response.message,
          status: "success",
        });
        router.push("/");
      }
    } catch (error: any) {
      setFormSummary({
        message: error.response?.data?.message ?? error.message,
        status: "error",
      });
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
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </FormControl>
      <GoogleLoginButton onFinish={postFederatedLogin} />
    </form>
  );
}
