
import { RegisterTenantData, RegisterTenantResponse, Tenant, ValidationErrorResponse } from "@/types/tenant";
import { axiosInstance } from "./axiosInstance";
import { AxiosError } from "axios";


class RegistrationError extends Error {
  public backendError?: ValidationErrorResponse;
  
  constructor(message: string, backendError?: ValidationErrorResponse) {
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
  } catch (err) {
    console.error("Backend registration error:", err);

     const axiosError = err as AxiosError<ValidationErrorResponse>;

    
   
   throw new RegistrationError(
      "Registration failed.",
      axiosError.response?.data
    );
  }
};

export const getAllTenants = async (): Promise<Tenant[]> => {
  const response = await axiosInstance.get<Tenant[]>(`tenants`,{
    headers: {
      'X-Tenant-ID': null
    }
  });
  return response.data;
};

export const getTenantByFrontendUrl = async (frontendUrl: string): Promise<Tenant> => {
  const res = await axiosInstance.get(`/tenants/by-frontend-url`, {
    params: { frontendUrl },
    

  });
  return res.data;
};