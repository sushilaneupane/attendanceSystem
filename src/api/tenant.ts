import axios  from "axios";

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
    let message = "Failed to register tenant";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    throw new Error(message);
  }
};
