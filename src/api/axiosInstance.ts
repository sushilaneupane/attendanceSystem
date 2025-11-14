import axios from "axios";
export const axiosInstance = axios.create({
  baseURL : (import.meta as any).env?.VITE_BASE_URL as string
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("authToken");

  const tenant = JSON.parse(localStorage.getItem("tenant") || "{}");


   
  if (token && config.requiresAuth !== false) {
    config.headers["Authorization"] = `Bearer ${token}`;
    

  if (tenant?.id && config.requiresAuth !== false) {
    config.headers["X-Tenant-ID"] = tenant.id;
  }

 

  return config;
}
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

