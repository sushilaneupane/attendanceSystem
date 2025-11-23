import { ReactNode } from "react";

export interface Employee {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email?: string;
  contactNumber1: string;
  contactNumber2?: string;
  address?: string;
  dateOfJoining?: string;
  dateOfBirth?: string;
  description?: string;
  deviceUserId?: string;
  isActive: boolean;
  marriedStatus?: string;
  gender?: string;
  designationId?: string;
  departmentId?: string;
  imageUrl?: string;
  departmentName?: string;
  designationName?: string;
}

export interface CreateEmployee {
  name: string;
  description?: string;
  isActive: boolean;
  employee: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
  success: boolean;
  errorMessage: string | null;
  detailErrorMessage: string | null;
  statusCode: number;
}

export interface Props {
  isEditing?: boolean;
  defaultValues?: Employee | null;
  onSubmitSuccess: () => void;
}

