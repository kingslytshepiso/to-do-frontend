"use client";
import { useEffect } from "react";
import { useLoading } from "./loading-context";

export const useApiLoading = () => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const handleLoadingStart = (event: CustomEvent) => {
      const { requestId, url } = event.detail;
      const message = `Loading ${url?.split("/").pop() || "data"}...`;
      startLoading(requestId, message);
    };

    const handleLoadingStop = (event: CustomEvent) => {
      const { requestId } = event.detail;
      stopLoading(requestId);
    };

    // Add event listeners for API loading events
    window.addEventListener(
      "api-loading-start",
      handleLoadingStart as EventListener
    );
    window.addEventListener(
      "api-loading-stop",
      handleLoadingStop as EventListener
    );

    return () => {
      // Cleanup event listeners
      window.removeEventListener(
        "api-loading-start",
        handleLoadingStart as EventListener
      );
      window.removeEventListener(
        "api-loading-stop",
        handleLoadingStop as EventListener
      );
    };
  }, [startLoading, stopLoading]);
};
