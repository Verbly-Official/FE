import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("accessToken");

  if (!raw) {
    delete config.headers.Authorization;
    delete api.defaults.headers.common.Authorization;
    return config;
  }

  const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
