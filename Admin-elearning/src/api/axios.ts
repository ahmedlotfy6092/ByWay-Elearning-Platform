import axios, { type AxiosRequestConfig } from "axios";

// Default to the backend dev HTTP URL (matches backend/ByWay/.../launchSettings.json)
// Override with VITE_API_BASE_URL in the environment when necessary.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:7135/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token from localStorage if present
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("byway_token");
  if (token) {
    config.headers = {
      ...(config.headers as Record<string, string> | undefined),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default api;
