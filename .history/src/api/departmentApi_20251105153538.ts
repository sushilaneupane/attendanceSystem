import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

// Define a type for a department (update fields based on your API response)
export interface Department {
  id: number;
  name: string;
  description?: string;
}

// Define a typed API response structure (optional but recommended)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

export const getDepartments = async (): Promise<ApiResponse<Department[]>> => {
  const response = await axios.get<ApiResponse<Department[]>>(
    `${apiUrl}/Departments`
  );
  return response.data;
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    