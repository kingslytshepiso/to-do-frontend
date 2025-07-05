"use client";
import {
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks/auth-context";

type AuthErrorDisplayProps = {
  className?: string;
  showCloseButton?: boolean;
};

export default function AuthErrorDisplay({
  className = "",
  showCloseButton = true,
}: AuthErrorDisplayProps) {
  const { error, clearError } = useAuth();

  if (!error) {
    return null;
  }

  const getErrorIcon = (code?: string) => {
    // You can customize icons based on error codes
    switch (code) {
      case "401":
        return faExclamationTriangle;
      case "403":
        return faExclamationTriangle;
      case "404":
        return faExclamationTriangle;
      case "500":
        return faExclamationTriangle;
      default:
        return faExclamationTriangle;
    }
  };

  const getErrorColor = (code?: string) => {
    // You can customize colors based on error codes
    switch (code) {
      case "401":
        return "bg-red-50 border-red-200 text-red-800";
      case "403":
        return "bg-red-50 border-red-200 text-red-800";
      case "404":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "500":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-red-50 border-red-200 text-red-800";
    }
  };

  return (
    <div
      className={`rounded-lg border p-4 ${getErrorColor(
        error.code
      )} ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FontAwesomeIcon
            icon={getErrorIcon(error.code)}
            className="h-5 w-5 text-red-400"
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{error.message}</p>
          {error.code && (
            <p className="mt-1 text-xs opacity-75">Error Code: {error.code}</p>
          )}
        </div>
        {showCloseButton && (
          <div className="ml-auto pl-3">
            <button
              onClick={clearError}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact version for inline display
export function AuthErrorInline({ className = "" }: { className?: string }) {
  const { error, clearError } = useAuth();

  if (!error) {
    return null;
  }

  return (
    <div className={`text-sm text-red-600 ${className}`}>
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4" />
        <span>{error.message}</span>
        <button
          onClick={clearError}
          className="text-red-400 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
