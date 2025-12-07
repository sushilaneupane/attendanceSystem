
import {  FetchLeavesParams, LeavesApiResponse } from '../types/leave';
import { axiosInstance } from './axiosInstance';

export const fetchLeavesAPI = async (
  params?: FetchLeavesParams
): Promise<LeavesApiResponse> => {
  const { data } = await axiosInstance.get('/leaves', { params });
  return data;
};