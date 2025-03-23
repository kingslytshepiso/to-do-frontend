/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "../services/auth.service";
import FormControl from "@/modules/shared/form-control";
import { useState } from "react";

type LoginFormInputs = {
  username: string;
  password: string;
};
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const [formSummary, setFormSummary] = useState<string>();
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
      setFormSummary(data.message);
    } catch (error: any) {
      setFormSummary(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      {formSummary && <p>{formSummary}</p>}
      <FormControl>
        <label>Username:</label>
        <input {...register("username")} type="email" />
        {errors.username && <span>{errors.username.message}</span>}
      </FormControl>
      <FormControl>
        <label>Password</label>
        <input {...register("password")} type="password" />
        {errors.password && <span>{errors.password.message}</span>}
      </FormControl>
      <FormControl>
        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
        />
      </FormControl>
    </form>
  );
}
