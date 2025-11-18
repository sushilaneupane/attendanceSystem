import { ReactNode } from "react";
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
  department: string;
}
export interface ApiResponse<T> {
    id: ReactNode;
    isActive: boolean;
    name: ReactNode;
  data: T;
  message?: string;
  status?: string;
   success: boolean;
  errorMessage: string | null;
  detailErrorMessage: string | null;
  statusCode: number;
}


