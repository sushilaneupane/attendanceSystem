import { ReactNode } from "react";
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
  employee: string;
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
