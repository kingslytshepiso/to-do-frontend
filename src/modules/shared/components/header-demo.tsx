"use client";
import { useState } from "react";
import { useLoading } from "../hooks/loading-context";
import Header from "./header";

export default function HeaderDemo() {
  const { startLoading, stopLoading, getGlobalLoading } = useLoading();
  const [isSimulatingAuth, setIsSimulatingAuth] = useState(false);
  const [isSimulatingApi, setIsSimulatingApi] = useState(false);

  // Simulate authentication loading
  const simulateAuthLoading = async () => {
    setIsSimulatingAuth(true);
    startLoading("auth-simulation", "Checking authentication...");

    // Simulate auth check
    await new Promise((resolve) => setTimeout(resolve, 3000));

    stopLoading("auth-simulation");
    setIsSimulatingAuth(false);
  };

  // Simulate API loading
  const simulateApiLoading = async () => {
    setIsSimulatingApi(true);
    startLoading("api-simulation", "Loading data...");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    stopLoading("api-simulation");
    setIsSimulatingApi(false);
  };

  const hasGlobalLoading = getGlobalLoading();

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Header Skeleton Demo</h2>

        {/* Header Display */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Header Component:
          </h3>
          <Header />
        </div>

        {/* Loading Status */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                hasGlobalLoading ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <span className="text-sm">
              Global Loading: {hasGlobalLoading ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isSimulatingAuth ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <span className="text-sm">
              Auth Simulation: {isSimulatingAuth ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isSimulatingApi ? "bg-purple-500" : "bg-gray-300"
              }`}
            ></div>
            <span className="text-sm">
              API Simulation: {isSimulatingApi ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Test Controls:</h3>

          <div className="flex space-x-4">
            <button
              onClick={simulateAuthLoading}
              disabled={isSimulatingAuth}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSimulatingAuth
                ? "Simulating Auth..."
                : "Simulate Auth Loading"}
            </button>

            <button
              onClick={simulateApiLoading}
              disabled={isSimulatingApi}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              {isSimulatingApi ? "Simulating API..." : "Simulate API Loading"}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">How it works:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • The header shows skeletons when authentication is loading or
              there&apos;s global API activity
            </li>
            <li>
              • Skeleton appearance adapts based on whether the user is likely
              authenticated
            </li>
            <li>
              • Try clicking the buttons above to see different loading states
            </li>
            <li>
              • The global loading bar at the top will also show during API
              calls
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
