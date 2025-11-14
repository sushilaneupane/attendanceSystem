
import { axiosInstance } from "./axiosInstance";

export interface RegisterTenantData {
  name: string;
  server: string;
  database: string;
  useWindowsAuth: boolean;
  userId: string | null;
  password: string | null;
  frontendUrl: string;
}

export interface RegisterTenantResponse {
  name: string;
  server: string;
  database: string;
  useWindowsAuth: boolean;
  userId: string | null;
  password: string | null;
  frontendUrl: string;
}

export interface Tenant {
  id: string;
  name: string;
  frontendUrl: string;
  isActive: boolean;
  createdAt: string;

}

class RegistrationError extends Error {
  public backendError?: any;
  
  constructor(message: string, backendError?: any) {
    super(message);
    this.name = "RegistrationError";
    this.backendError = backendError;
  }
}

export const registerTenant = async (
  data: RegisterTenantData
): Promise<RegisterTenantResponse> => {
  try {
    const response = await axiosInstance.post<RegisterTenantResponse>(
      `/Tenants`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Backend registration error:", error);
    
   
    throw new RegistrationError(
      "Registration failed. ",
      error
    );
  }
};

export const getAllTenants = async (): Promise<Tenant[]> => {
  const response = await axiosInstance.get<Tenant[]>(`/Tenants`);
  return response.data;
};

export const getTenantByFrontendUrl = async (frontendUrl: string): Promise<Tenant> => {
  const res = await axiosInstance.get(`/Tenants/by-frontend-url`, {
    params: { frontendUrl },
    

  });
  return res.data;
};