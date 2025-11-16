import axios from "axios";
export const axiosInstance = axios.create({
  baseURL : (import.meta as any).env?.VITE_BASE_URL as string
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("authToken");
  const tenant = JSON.parse(localStorage.getItem("tenant") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (token && config.requiresAuth !== false) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    if (user?.role === "SuperAdmin") {
    delete config.headers["X-Tenant-ID"];
    return config;
  }
const isSuperAdmin = user?.role === "SuperAdmin";

  if (config.requiresAuth !== false && tenant?.id && !isSuperAdmin) {
    config.headers["X-Tenant-ID"] = tenant.id;
  }


  return config;
}
);


