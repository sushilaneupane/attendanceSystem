import { axiosInstance } from "./axiosInstance";
import axios from "axios";


const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

export interface UserData {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  username?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  role?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: string;
}

export const createUser = async (userData: UserData): Promise<ApiResponse> => {
  const response = await axios.post(`${apiUrl}/Authentication/Register-User`, userData);
  
  return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<ApiResponse> => {
  const response = await axiosInstance.post(`${apiUrl}/Authentication/Login-User`, credentials);
  return response.data;
};

export const logoutUser = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.post(`${apiUrl}/Authentication/Logout`);
  return response.data;
};
