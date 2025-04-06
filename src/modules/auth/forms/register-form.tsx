/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useNotification } from "@/modules/shared/hooks/notification-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import RegisterInput from "../types/register-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../hooks/auth-context";
import AppIcon from "@/modules/shared/components/app-icon";
import { TextBox } from "@/modules/shared/components/forms/text-box";
import FormControl from "@/modules/shared/components/forms/form-control";
import Button from "@/modules/shared/components/button";
import GoogleAuthButton from "../components/google-auth-button";

type FormSummary = {
  message: string;
  status: "error" | "success" | "info";
};

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  autoLogin: yup.boolean().optional(),
});
export default function RegisterForm() {
  const [formSummary, setFormSummary] = useState<FormSummary>();
  const router = useRouter();
  const { register: signUp } = useAuth();
  const { addNotification } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      autoLogin: true,
    },
  });
  const onSubmit: SubmitHandler<RegisterInput> = async (formData) => {
    try {
      const response = await signUp(formData);
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
        label="First name"
        {...register("firstName")}
        type="text"
        placeholder="Enter your first name."
        error={errors.firstName}
      />
      <TextBox
        label="Last name"
        {...register("lastName")}
        type="text"
        placeholder="Enter your last name."
        error={errors.lastName}
      />
      <TextBox
        label="Username"
        {...register("username")}
        type="text"
        placeholder="Enter your username."
        error={errors.username}
      />
      <input {...register("autoLogin")} type="hidden" />
      <TextBox
        label="Password"
        {...register("password")}
        placeholder="Enter your password."
        type="password"
        error={errors.password}
      />
      <TextBox
        label="Confirm password"
        {...register("confirmPassword")}
        placeholder="Confirm your password."
        type="password"
        error={errors.confirmPassword}
      />
      <FormControl>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </FormControl>
      <GoogleAuthButton type="register" onFinish={postFederatedLogin} />
    </form>
  );
}
