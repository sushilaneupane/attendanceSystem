
import { axiosInstance } from "./axiosInstance";
import { CreateDepartment, Department } from "@/types/department";
import { ApiResponse } from "@/types/login";

export const getDepartments = async (): Promise<ApiResponse<Department[]>> => {
  const response = await axiosInstance.get<ApiResponse<Department[]>>(
    `/department`
  );
  return response.data;
};

export const getDepartmentById = async (id: string | number): Promise<ApiResponse<Department>> => {
  const response = await axiosInstance.get<ApiResponse<Department>>(
    `/department/${id}`
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
  const response = await axiosInstance.patch<ApiResponse<Department>>(
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
