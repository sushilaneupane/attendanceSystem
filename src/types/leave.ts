import { ReactNode } from "react";

export interface Leave {
  id: string;
  employeeName: string;
  leaveType: number;
  startDate: string;
  endDate: string;

  days: ReactNode;
  dateTo: string;
  dateFrom: string;
  isApproved: boolean;

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
