import axios from "axios";
export const axiosInstance = axios.create({
  baseURL : (import.meta as any).env?.VITE_BASE_URL as string
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tenant = JSON.parse(localStorage.getItem("tenant") || "{}");

  if (config.requiresAuth !== false && token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.requiresAuth !== false && user.role === "tenant-admin" && tenant?.id) {
    config.headers["X-Tenant-ID"] = tenant.id;
  }

  return config;
});

