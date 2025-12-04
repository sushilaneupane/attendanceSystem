
import { GenderEnum } from "./enum/gender";
import { marriedStatusEnum } from "./enum/marriedStatus";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  contactNumber1: string;
  contactNumber2?: string;
  address?: string;
  dateOfJoining: string; 
  dateOfBirth: string;   
  description?: string;
  deviceUserId: number;  
  isActive: boolean;
  marriedStatus: marriedStatusEnum;
  gender: GenderEnum;
  designationId: string;  
  designationName?: string;
  departmentId: string;   
  departmentName?: string;
  imageUrl?: string;
  password?: string; 
}
export interface CreateEmployee {
  firstName: string;
  lastName: string;
  email?: string;
  contactNumber1: string;
  contactNumber2?: string;
  address?: string;
  dateOfJoining?: string;
  dateOfBirth?: string;
  description?: string;
  deviceUserId?: number;
  isActive: boolean;
  marriedStatus: marriedStatusEnum;
  gender: GenderEnum;
  designationId?: string;
  departmentId?: string;
  imageUrl?: string;
  password: string;
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

