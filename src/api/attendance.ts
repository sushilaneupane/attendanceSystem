import { axiosInstance } from "./axiosInstance";
import { Attendance } from "@/types/attendance";
import { ApiResponse } from "@/types/login";

export const getAttendance = async (): Promise<ApiResponse<Attendance[]>> => {
  const response = await axiosInstance.get<ApiResponse<Attendance[]>>(
    `/attendance`
  );
  return response.data;
};