import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

export const getDepartments = async (): Promise<ApiResponse<Department[]>> => {

  console.log("departments");
  
  const response = await axios.get<ApiResponse<Department[]>>(
    `${apiUrl}/Department`
  );
  return response.data;
};
