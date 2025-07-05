"use client";
import { useLoading } from "../hooks/loading-context";
import api from "../utils/api";
import LoadingButton from "./loading-button";

export default function LoadingExample() {
  const { startLoading, stopLoading, isLoading } = useLoading();

  // Example 1: Manual loading state
  const handleManualLoading = async () => {
    const loadingId = "manual-operation";
    startLoading(loadingId, "Performing manual operation...");

    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 2000));

    stopLoading(loadingId);
  };

  // Example 2: API call with automatic loading tracking
  const handleApiCall = async () => {
    try {
      // This will automatically show loading via the API interceptor
      await api.get("/some-endpoint");
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  // Example 3: Check if specific operation is loading
  const isManualLoading = isLoading("manual-operation");

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Loading System Examples</h2>

      <div className="space-y-2">
        <h3 className="font-semibold">1. Manual Loading State</h3>
        <LoadingButton
          loadingId="manual-operation"
          onClick={handleManualLoading}
        >
          Start Manual Operation
        </LoadingButton>
        {isManualLoading && (
          <p className="text-sm text-gray-600">
            Manual operation in progress...
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">2. Automatic API Loading</h3>
        <button
          onClick={handleApiCall}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Make API Call (Auto-loading)
        </button>
        <p className="text-sm text-gray-600">
          This will automatically show loading via the global loading bar
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">3. Loading State Check</h3>
        <p className="text-sm">
          Manual operation loading: {isManualLoading ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
