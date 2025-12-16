
import {  FetchLeavesParams, LeavesApiResponse,UpdateLeaveData } from '../types/leave';
import { axiosInstance } from './axiosInstance';

export const fetchLeavesAPI = async (
  params?: FetchLeavesParams
): Promise<LeavesApiResponse> => {
  const { data } = await axiosInstance.get('/leaves', { params });
  return data;
};

export const deleteLeave = async (id: string | number) => {
  const response = await axiosInstance.delete(`/leaves/${id}`);
  return response.data; 
};

export const updateLeave = async (id: string, data: UpdateLeaveData) => {
  const response = await axiosInstance.patch(`/leaves/${id}`, data);
  return response.data;
};
