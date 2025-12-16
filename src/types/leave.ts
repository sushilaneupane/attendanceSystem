import { leaveEditSchema } from "@/Validator/leave";
import { ReactNode } from "react";
import z from "zod";
export interface Leave {
  employeeId: string;
  id: string;
  employeeName: string;
  leaveType: number;
  startDate: string;
  endDate: string;
  days: ReactNode;
  dateTo: string;
  dateFrom: string;
 leaveApproval: boolean;
  status: number;
  leaveReason: string;
  appliedOnDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  errorMessage: string | null;
  detailErrorMessage: string | null;
  data: T;
  statusCode: number;
}

export type LeavesApiResponse = ApiResponse<Leave[]>;

export interface LeaveStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface FetchLeavesParams {
  FromDate?: string;
  ToDate?: string;
  Approved?: boolean;
  Name?: string;
}
export interface UpdateLeaveData{
  status:number;
 



}
export type UpdateLeaveDatas = z.infer<typeof leaveEditSchema> 

