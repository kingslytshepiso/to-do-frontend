"use client";
import { useLoading } from "../hooks/loading-context";
import Button from "./button";

type LoadingButtonProps = {
  loadingId: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function LoadingButton({
  loadingId,
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = "",
}: LoadingButtonProps) {
  const { isLoading } = useLoading();
  const isButtonLoading = isLoading(loadingId);

  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled || isButtonLoading}
      type={type}
      className={className}
    >
      {isButtonLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
