"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type LoadingState = {
  id: string;
  isLoading: boolean;
  message?: string;
};

type LoadingContextType = {
  loadingStates: LoadingState[];
  startLoading: (id: string, message?: string) => void;
  stopLoading: (id: string) => void;
  isLoading: (id: string) => boolean;
  getGlobalLoading: () => boolean;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingStates, setLoadingStates] = useState<LoadingState[]>([]);

  const startLoading = (id: string, message?: string) => {
    setLoadingStates((prev) => {
      // Check if loading state already exists
      const existingIndex = prev.findIndex((state) => state.id === id);

      if (existingIndex >= 0) {
        // Update existing loading state
        const updated = [...prev];
        updated[existingIndex] = { id, isLoading: true, message };
        return updated;
      } else {
        // Add new loading state
        return [...prev, { id, isLoading: true, message }];
      }
    });
  };

  const stopLoading = (id: string) => {
    setLoadingStates((prev) => prev.filter((state) => state.id !== id));
  };

  const isLoading = (id: string) => {
    return loadingStates.some((state) => state.id === id && state.isLoading);
  };

  const getGlobalLoading = () => {
    return loadingStates.length > 0;
  };

  return (
    <LoadingContext.Provider
      value={{
        loadingStates,
        startLoading,
        stopLoading,
        isLoading,
        getGlobalLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
