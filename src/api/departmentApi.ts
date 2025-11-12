
import { axiosInstance } from "./axiosInstance";

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
  const response = await axiosInstance.get<ApiResponse<Department[]>>(
    `/department`
  );
  return response.data;
};

export const registerDepartment = async (
  department: CreateDepartment
): Promise<ApiResponse<Department>> => {
  const response = await axiosInstance.post<ApiResponse<Department>>(
    `/department`,
    department
  );
  return response.data;
};

export const updateDepartment = async (
  id: string,
  department: CreateDepartment
): Promise<ApiResponse<Department>> => {
  const response = await axiosInstance.put<ApiResponse<Department>>(
    `/department/${id}`,
    department
  );
  return response.data;
};

export const deleteDepartment = async (
  id: string
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.delete<ApiResponse<null>>(
    `/department/${id}`
  );
  return response.data;
};
