import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.peakpay.com", // Placeholder URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Auth Token
api.interceptors.request.use(
  (config) => {
    // In a real app, we'd grab this from Zustand or Cookies
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Global 401: Unauthorized/Expired
      if (status === 401) {
        // Handle logout or token refresh here
        if (typeof window !== "undefined") {
          // window.location.href = '/login';
        }
      }

      // Global 500: Server Error
      if (status >= 500) {
        console.error("Server error detected, showing global alert...");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
