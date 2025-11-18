

import { axiosInstance } from "./axiosInstance";
import { CreateEmployee, Employee } from "@/types/employee";
import { ApiResponse } from "@/types/login";






export const getEmployee = async (): Promise<ApiResponse<Employee[]>> => {
  const response = await axiosInstance.get<ApiResponse<Employee[]>>(
    `/Employee`
  );
  return response.data;
};


export const registerEmployee = async (
  department: CreateEmployee
): Promise<ApiResponse<Employee>> => {
  const response = await axiosInstance.post<ApiResponse<Employee>>(
    `/Employee`,
  );
  return response.data;
};