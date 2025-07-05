import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Add request interceptor to track loading
api.interceptors.request.use(
  (config) => {
    // Generate a unique ID for this request
    const requestId = `${config.method?.toUpperCase()}_${config.url}`;

    // Dispatch loading start event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("api-loading-start", {
          detail: { requestId, url: config.url },
        })
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to track loading completion
api.interceptors.response.use(
  (response) => {
    const requestId = `${response.config.method?.toUpperCase()}_${
      response.config.url
    }`;

    // Dispatch loading stop event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("api-loading-stop", {
          detail: { requestId, url: response.config.url },
        })
      );
    }

    return response;
  },
  (error) => {
    const requestId = `${error.config?.method?.toUpperCase()}_${
      error.config?.url
    }`;

    // Dispatch loading stop event even on error
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("api-loading-stop", {
          detail: { requestId, url: error.config?.url },
        })
      );
    }

    return Promise.reject(error);
  }
);

export default api;
