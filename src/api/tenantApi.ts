import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

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

// Custom error class to preserve backend details but show user-friendly message
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
    const response = await axios.post<RegisterTenantResponse>(
      `${apiUrl}/Tenants`,
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