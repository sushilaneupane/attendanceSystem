import { axiosInstance } from "./axiosInstance";
import { Employee } from "@/types/employee";
import { ApiResponse } from "@/types/login";

export const getEmployee = async (): Promise<ApiResponse<Employee[]>> => {
  const res = await axiosInstance.get<ApiResponse<Employee[]>>(`/employee`);
  return res.data;
};

export const getEmployeeById = async (id: string | number): Promise<ApiResponse<Employee>> => {
  const response = await axiosInstance.get<ApiResponse<Employee>>(
    `/employee/${id}`
  );
  return response.data;
};

export const registerEmployee = async (
  payload: FormData
): Promise<ApiResponse<Employee>> => {
  const res = await axiosInstance.post<ApiResponse<Employee>>(
    `/employee`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};

export const updateEmployee = async (id: string, payload: FormData): Promise<ApiResponse<Employee>> => {
  const res = await axiosInstance.patch<ApiResponse<Employee>>(
    `/employee/${id}`, 
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return res.data;
};


export const deleteEmployee = async (id: string): Promise<void> => {
  await axiosInstance.delete<ApiResponse<null>>(`/employee/${id}`);
};
