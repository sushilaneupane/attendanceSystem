
import { ReactNode } from "react";
import { axiosInstance } from "./axiosInstance";


export interface Employee {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CreateEmployee {
  name: string;
  description?: string;
  isActive: boolean;
  department: string;
}

export interface ApiResponse<T> {
    id: ReactNode;
    isActive: any;
    name: ReactNode;
  data: T;
  message?: string;
  status?: string;
   success: boolean;
  errorMessage: string | null;
  detailErrorMessage: string | null;
  statusCode: number;
}

export const getEmployee = async (): Promise<ApiResponse<Employee[]>> => {
  const response = await axiosInstance.get<ApiResponse<Employee[]>>(
    `/Employee`
  );
  return response.data;
};