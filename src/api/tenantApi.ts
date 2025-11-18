
import { RegisterTenantData, RegisterTenantResponse, Tenant } from "@/types/tenant";
import { axiosInstance } from "./axiosInstance";

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
  const response = await axiosInstance.get<Tenant[]>(`/Tenants`,{
    headers: {
      'X-Tenant-ID': null
    }
  });
  return response.data;
};

export const getTenantByFrontendUrl = async (frontendUrl: string): Promise<Tenant> => {
  const res = await axiosInstance.get(`/Tenants/by-frontend-url`, {
    params: { frontendUrl },
    

  });
  return res.data;
};