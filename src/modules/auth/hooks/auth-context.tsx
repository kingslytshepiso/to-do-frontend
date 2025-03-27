"use client";

import AuthResponse from "@/modules/auth/dto/auth-response.dto";
import { AuthStatus } from "@/modules/auth/entities/auth-status.enum";
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "@/modules/shared/utils/api";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginInput } from "../types/login-input";
import { login } from "../services/auth.service";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<AuthResponse | undefined>;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [authenicated, setAuthenticated] = useState(false);

  const handleLogin = async (input: LoginInput) => {
    const { data } = await login(input);
    setUser({
      email: data.email,
      id: data.userId,
      name: data.fullName,
    });
    if (data.authStatus == AuthStatus.AUTHENTICATED) setAuthenticated(true);
    return data;
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.post<AuthResponse>("/auth/me");
        if (data.authStatus == AuthStatus.AUTHENTICATED) {
          setUser({
            id: data.userId,
            name: data.email,
            email: data.email,
          });
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: authenicated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
