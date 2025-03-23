"use client";

import AuthResponse from "@/modules/auth/dto/auth-response.dto";
import { AuthStatus } from "@/modules/auth/entities/auth-status.enum";
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "@/utils/api";
import { createContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

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

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
