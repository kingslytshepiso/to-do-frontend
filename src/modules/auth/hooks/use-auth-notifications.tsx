"use client";
import { useNotification } from "@/modules/shared/hooks/notification-context";
import { useEffect, useRef } from "react";
import { useAuth } from "./auth-context";

export const useAuthNotifications = () => {
  const { error, clearError } = useAuth();
  const { addNotification } = useNotification();
  const lastErrorRef = useRef<string | null>(null);

  useEffect(() => {
    if (error && error.message !== lastErrorRef.current) {
      // Track this error to prevent duplicate notifications
      lastErrorRef.current = error.message;

      // Show notification based on error type
      let notificationType: "error" | "success" | "info" = "error";

      // Determine notification type based on error code
      if (error.code) {
        switch (error.code) {
          case "401":
            notificationType = "error";
            break;
          case "403":
            notificationType = "error";
            break;
          case "404":
            notificationType = "info";
            break;
          case "500":
            notificationType = "error";
            break;
          default:
            notificationType = "error";
        }
      }

      // Show the notification
      addNotification(error.message, notificationType);

      // Auto-clear error after showing notification
      const timer = setTimeout(() => {
        clearError();
        lastErrorRef.current = null;
      }, 5000); // Clear after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error, addNotification, clearError]);

  return { error, clearError };
};
