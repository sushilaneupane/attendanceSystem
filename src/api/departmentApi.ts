import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CreateDepartment {
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
  const response = await axios.get<ApiResponse<Department[]>>(
    `${apiUrl}/department`
  );
  return response.data;
};

export const registerDepartment = async (
  department: CreateDepartment
): Promise<ApiResponse<Department>> => {
  const response = await axios.post<ApiResponse<Department>>(
    `${apiUrl}/department`,
    department
  );
  return response.data;
};

export const updateDepartment = async (
  id: string,
  department: CreateDepartment
): Promise<ApiResponse<Department>> => {
  const response = await axios.put<ApiResponse<Department>>(
    `${apiUrl}/department/${id}`,
    department
  );
  return response.data;
};

export const deleteDepartment = async (
  id: string
): Promise<ApiResponse<null>> => {
  const response = await axios.delete<ApiResponse<null>>(
    `${apiUrl}/department/${id}`
  );
  return response.data;
};
