// src/api/axiosInstance.ts
import axios from "axios";

// Create Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.VITE_BASE_URL, // Backend URL
});

// Interceptor to attach auth token and tenantId
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tenant = JSON.parse(localStorage.getItem("tenant") || "{}");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Attach tenantId only for tenant-admin users
  if (user.role === "tenant-admin" && tenant?.id) {
    config.headers["X-Tenant-ID"] = tenant.id;
  }

  return config;
});
