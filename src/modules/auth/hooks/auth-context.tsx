/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AuthResponse from "@/modules/auth/dto/auth-response.dto";
import { AuthStatus } from "@/modules/auth/entities/auth-status.enum";
import api from "@/modules/shared/utils/api";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginInput } from "../types/login-input";
import { login, logout, oauth2Login, register } from "../services/auth.service";
import Oauth2LoginInput from "../types/oauth2-login-input";
import RegisterInput from "../types/register-input";

type User = {
  id: string;
  name: string;
  email: string;
  authenticated: boolean;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  register: (data: RegisterInput) => Promise<AuthResponse | undefined>;
  login: (data: LoginInput) => Promise<AuthResponse | undefined>;
  federatedLogin: (data: Oauth2LoginInput) => Promise<AuthResponse | undefined>;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = async (input: RegisterInput) => {
    const { data } = await register(input);
    setUser({
      id: data.userId,
      name: data.email,
      email: data.email,
      authenticated: true,
    });
    return data;
  };

  const handleLogin = async (input: LoginInput) => {
    const { data } = await login(input);
    if (data.authStatus == AuthStatus.AUTHENTICATED) {
      setUser({
        id: data.userId,
        name: data.email,
        email: data.email,
        authenticated: true,
      });
    }
    return data;
  };
  const handleFederatedLogin = async (input: Oauth2LoginInput) => {
    const { data } = await oauth2Login(input);
    if (data.authStatus == AuthStatus.AUTHENTICATED) {
      setUser({
        id: data.userId,
        name: data.email,
        email: data.email,
        authenticated: true,
      });
    }
    return data;
  };

  const handleLogout = async () => {
    await logout();
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
            authenticated: true,
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
        register: handleRegister,
        login: handleLogin,
        federatedLogin: handleFederatedLogin,
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
