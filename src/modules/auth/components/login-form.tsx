/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../services/auth.service";
import { useState } from "react";
import AppIcon from "@/modules/shared/app-icon";
import { TextBox } from "@/modules/shared/text-box";
import Button from "@/modules/shared/button";
import FormControl from "@/modules/shared/form-control";

type LoginFormInputs = {
  username: string;
  password: string;
};
type FormSummary = {
  message: string;
  status: "error" | "success";
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
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginFormInputs> = async (formData) => {
    try {
      const { data } = await login(formData);
      setFormSummary({
        message: data.message,
        status: "success",
      });
    } catch (error: any) {
      setFormSummary({
        message: error.message,
        status: "error",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppIcon />
      {formSummary && (
        <p className={formSummary ? `text-red-500` : `text-green-500`}>
          {formSummary.message}
        </p>
      )}
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
    </form>
  );
}
