import { ApiResponse, LoginCredentials, UserData } from "@/types/login";
import { axiosInstance } from "./axiosInstance";
import axios from "axios";

const apiUrl = import.meta.env?.VITE_API_URL as string;

export const createUser = async (userData: UserData): Promise<ApiResponse> => {
  const response = await axios.post(`${apiUrl}/Authentication/Register-User`, userData);
  
  return response.data;
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<
  ApiResponse<{
    token: string;
    userDto: UserData;
  }>
> => {
  const response = await axiosInstance.post(`/Authentication/Login-User`, credentials);
  return response.data;
};

export const logoutUser = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.post(`/Authentication/Logout`);
  return response.data;
};
