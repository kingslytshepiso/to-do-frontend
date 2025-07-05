"use client";
import { useLoading } from "../hooks/loading-context";
import { useApiLoading } from "../hooks/use-api-loading";

export default function GlobalLoading() {
  const { loadingStates, getGlobalLoading } = useLoading();

  // Initialize API loading tracking
  useApiLoading();

  const isLoading = getGlobalLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div className="h-full bg-blue-500 animate-pulse" />
    </div>
  );
}
