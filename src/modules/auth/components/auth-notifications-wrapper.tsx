"use client";
import { ReactNode } from "react";
import { useAuthNotifications } from "../hooks/use-auth-notifications";

type AuthNotificationsWrapperProps = {
  children: ReactNode;
};

export function AuthNotificationsWrapper({
  children,
}: AuthNotificationsWrapperProps) {
  // This hook will automatically show notifications for auth errors
  useAuthNotifications();

  return <>{children}</>;
}
