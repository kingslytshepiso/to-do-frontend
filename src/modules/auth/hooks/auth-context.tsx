/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import AuthResponse from "@/modules/auth/dto/auth-response.dto";
import { AuthStatus } from "@/modules/auth/entities/auth-status.enum";
import api from "@/modules/shared/utils/api";
import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, oauth2Login, register } from "../services/auth.service";
import { LoginInput } from "../types/login-input";
import Oauth2LoginInput from "../types/oauth2-login-input";
import RegisterInput from "../types/register-input";
import { CookieUtils, StorageUtils } from "../utils/storage";

type User = {
  id: string;
  name: string;
  email: string;
  authenticated: boolean;
} | null;

type AuthError = {
  message: string;
  code?: string;
  field?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  error: AuthError;
  clearError: () => void;
  register: (data: RegisterInput) => Promise<AuthResponse | undefined>;
  login: (data: LoginInput) => Promise<AuthResponse | undefined>;
  federatedLogin: (data: Oauth2LoginInput) => Promise<AuthResponse | undefined>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Helper function to extract user-friendly error messages
const getErrorMessage = (
  error: unknown,
  context?: "register" | "login" | "federated" | "logout" | "me"
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, unknown>;

    // Handle axios error responses
    if (errorObj.response && typeof errorObj.response === "object") {
      const response = errorObj.response as Record<string, unknown>;
      const status = typeof response.status === "number" ? response.status : 0;

      if (response.data && typeof response.data === "object") {
        const data = response.data as Record<string, unknown>;

        // Check for specific error messages from backend
        if (typeof data.message === "string") {
          return data.message;
        }

        // Check for error field
        if (typeof data.error === "string") {
          return data.error;
        }

        // Check for Spring Boot specific error patterns
        if (data.timestamp && data.path) {
          // This looks like a Spring Boot error response
          if (typeof data.error === "string") {
            return data.error;
          }
          if (typeof data.message === "string") {
            return data.message;
          }
        }

        // Check for validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const firstError = data.errors[0];
          if (typeof firstError === "string") {
            return firstError;
          }
          if (typeof firstError === "object" && firstError !== null) {
            const errorDetail = firstError as Record<string, unknown>;
            if (typeof errorDetail.message === "string") {
              return errorDetail.message;
            }
            if (typeof errorDetail.error === "string") {
              return errorDetail.error;
            }
            if (typeof errorDetail.defaultMessage === "string") {
              return errorDetail.defaultMessage;
            }
          }
        }

        // Check for field-specific validation errors
        if (
          data.validationErrors &&
          typeof data.validationErrors === "object"
        ) {
          const validationErrors = data.validationErrors as Record<
            string,
            unknown
          >;
          const firstField = Object.keys(validationErrors)[0];
          if (firstField && typeof validationErrors[firstField] === "string") {
            return validationErrors[firstField] as string;
          }
        }

        // Check for Spring Boot validation error format
        if (data.fieldErrors && Array.isArray(data.fieldErrors)) {
          const firstFieldError = data.fieldErrors[0];
          if (typeof firstFieldError === "object" && firstFieldError !== null) {
            const fieldError = firstFieldError as Record<string, unknown>;
            if (typeof fieldError.defaultMessage === "string") {
              return fieldError.defaultMessage;
            }
            if (typeof fieldError.message === "string") {
              return fieldError.message;
            }
          }
        }
      }

      // Map HTTP status codes to user-friendly messages
      switch (status) {
        case 400:
          return getContextSpecificMessage("bad_request", context);
        case 401:
          return getContextSpecificMessage("unauthorized", context);
        case 403:
          return getContextSpecificMessage("forbidden", context);
        case 404:
          return getContextSpecificMessage("not_found", context);
        case 409:
          return getContextSpecificMessage("conflict", context);
        case 422:
          return getContextSpecificMessage("validation_error", context);
        case 429:
          return "Too many requests. Please wait a moment and try again.";
        case 500:
          return "Server error. Please try again later.";
        case 502:
        case 503:
        case 504:
          return "Service temporarily unavailable. Please try again later.";
      }
    }

    // Handle network errors
    if (
      errorObj.code === "NETWORK_ERROR" ||
      (typeof errorObj.message === "string" &&
        errorObj.message.includes("Network Error"))
    ) {
      return "Unable to connect to the server. Please check your internet connection and try again.";
    }

    // Handle timeout errors
    if (
      errorObj.code === "ECONNABORTED" ||
      (typeof errorObj.message === "string" &&
        errorObj.message.includes("timeout"))
    ) {
      return "Request timed out. Please try again.";
    }

    // Handle CORS errors
    if (
      typeof errorObj.message === "string" &&
      errorObj.message.includes("CORS")
    ) {
      return "Unable to connect to the server. Please try again later.";
    }

    // Handle SSL/TLS errors
    if (
      typeof errorObj.message === "string" &&
      (errorObj.message.includes("SSL") || errorObj.message.includes("TLS"))
    ) {
      return "Secure connection failed. Please try again later.";
    }

    // Handle generic error messages
    if (typeof errorObj.message === "string") {
      return errorObj.message;
    }
  }

  return "An unexpected error occurred. Please try again.";
};

// Helper function to get context-specific error messages
const getContextSpecificMessage = (
  errorType: string,
  context?: "register" | "login" | "federated" | "logout" | "me"
): string => {
  switch (errorType) {
    case "bad_request":
      switch (context) {
        case "register":
          return "Please check your registration information. Make sure all fields are filled correctly.";
        case "login":
          return "Please check your email and password. Make sure both fields are filled correctly.";
        case "federated":
          return "There was an issue with your social login. Please try again or use email/password login.";
        default:
          return "Invalid request. Please check your information and try again.";
      }

    case "unauthorized":
      switch (context) {
        case "login":
          return "Invalid email or password. Please check your credentials and try again.";
        case "federated":
          return "Social login failed. Please try again or use email/password login instead.";
        case "me":
          return "Your session has expired. Please log in again to continue.";
        default:
          return "Authentication required. Please log in to continue.";
      }

    case "forbidden":
      switch (context) {
        case "register":
          return "Registration is currently disabled. Please contact support for assistance.";
        case "login":
          return "Your account has been suspended. Please contact support for assistance.";
        default:
          return "Access denied. Please contact support if you believe this is an error.";
      }

    case "not_found":
      switch (context) {
        case "me":
          return "User session not found. Please log in again to continue.";
        default:
          return "The requested resource was not found.";
      }

    case "conflict":
      switch (context) {
        case "register":
          return "An account with this email already exists. Please try logging in instead, or use a different email address.";
        default:
          return "This resource already exists.";
      }

    case "validation_error":
      switch (context) {
        case "register":
          return "Please check your registration information. Make sure your password is at least 8 characters long, your email is valid, and all required fields are filled.";
        case "login":
          return "Please check your email and password format. Make sure your email is valid and password is not empty.";
        default:
          return "Please check your information and try again.";
      }

    default:
      return "An error occurred. Please try again.";
  }
};

// Helper function to create structured error object
const createAuthError = (
  error: unknown,
  context?: "register" | "login" | "federated" | "logout" | "me",
  field?: string
): AuthError => {
  const message = getErrorMessage(error, context);

  // Extract error code if available
  let code: string | undefined;
  if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, unknown>;
    if (errorObj.response && typeof errorObj.response === "object") {
      const response = errorObj.response as Record<string, unknown>;
      if (typeof response.status === "number") {
        code = response.status.toString();
      }
    }
    if (!code && typeof errorObj.code === "string") {
      code = errorObj.code;
    }
  }

  return {
    message,
    code,
    field,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError>(null);

  const clearError = () => {
    setError(null);
  };

  // Silent logout function that doesn't trigger errors or notifications
  const silentLogout = async () => {
    try {
      // Try to call backend logout to clear server-side session
      await logout();
    } catch (error) {
      // Ignore logout errors - we'll clear client-side anyway
      if (process.env.NODE_ENV === "development") {
        console.debug("Silent logout failed:", error);
      }
    } finally {
      // Always clear client-side state and cookies
      setUser(null);
      StorageUtils.removeItem("user");
      CookieUtils.clearAuthCookies();
    }
  };

  const handleRegister = async (input: RegisterInput) => {
    try {
      clearError();
      const { data } = await register(input);

      const newUser = {
        id: data.userId,
        name: data.fullName || data.email, // Use fullName if available, fallback to email
        email: data.email,
        authenticated: true,
      };
      setUser(newUser);
      StorageUtils.setItem("user", newUser);
      return data;
    } catch (error: unknown) {
      const authError = createAuthError(error, "register");
      setError(authError);
      console.error("Registration error:", error);
      throw error; // Re-throw to allow form handling
    }
  };

  const handleLogin = async (input: LoginInput) => {
    try {
      clearError();
      const { data } = await login(input);

      if (data.authStatus === AuthStatus.AUTHENTICATED) {
        const newUser = {
          id: data.userId,
          name: data.fullName || data.email, // Use fullName if available, fallback to email
          email: data.email,
          authenticated: true,
        };
        setUser(newUser);
        StorageUtils.setItem("user", newUser);
      } else {
        // Handle authentication failure
        const authError = createAuthError(
          new Error(data.message || "Authentication failed"),
          "login"
        );
        setError(authError);
      }
      return data;
    } catch (error: unknown) {
      const authError = createAuthError(error, "login");
      setError(authError);
      console.error("Login error:", error);
      throw error; // Re-throw to allow form handling
    }
  };

  const handleFederatedLogin = async (input: Oauth2LoginInput) => {
    try {
      clearError();
      const { data } = await oauth2Login(input);

      if (data.authStatus === AuthStatus.AUTHENTICATED) {
        const newUser = {
          id: data.userId,
          name: data.fullName || data.email, // Use fullName if available, fallback to email
          email: data.email,
          authenticated: true,
        };
        setUser(newUser);
        StorageUtils.setItem("user", newUser);
      } else {
        // Handle authentication failure
        const authError = createAuthError(
          new Error(data.message || "Federated authentication failed"),
          "federated"
        );
        setError(authError);
      }
      return data;
    } catch (error: unknown) {
      const authError = createAuthError(error, "federated");
      setError(authError);
      console.error("Federated login error:", error);
      throw error; // Re-throw to allow form handling
    }
  };

  const handleLogout = async () => {
    try {
      clearError();
      await logout();
      setUser(null);
      StorageUtils.removeItem("user");
      CookieUtils.clearAuthCookies();
    } catch (error: unknown) {
      const authError = createAuthError(error, "logout");
      setError(authError);
      console.error("Logout error:", error);

      // Even if logout fails, clear local state and cookies
      setUser(null);
      StorageUtils.removeItem("user");
      CookieUtils.clearAuthCookies();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Don't clear error here - let it persist if user is actively working
        const { data } = await api.post<AuthResponse>("/auth/me");

        // Handle the response based on auth status
        if (data.authStatus === AuthStatus.AUTHENTICATED) {
          // User is authenticated (tokens may have been automatically refreshed)
          const newUser = {
            id: data.userId,
            name: data.fullName || data.email, // Use fullName if available, fallback to email
            email: data.email,
            authenticated: true,
          };
          setUser(newUser);
          StorageUtils.setItem("user", newUser);
          // Silent success - no console log needed
        } else {
          // User is not authenticated (backend cleared cookies automatically)
          setUser(null);
          StorageUtils.removeItem("user");
          // Silent failure - no console log needed
        }
      } catch (error: unknown) {
        // Silent error handling - use silent logout to properly clear tokens
        // Only log in development for debugging purposes
        if (process.env.NODE_ENV === "development") {
          console.debug("Silent auth check failed:", error);
        }

        // Use silent logout to properly clear both client state and server tokens
        await silentLogout();
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
        error,
        clearError,
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
