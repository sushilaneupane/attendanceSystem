import { Leave, FetchLeavesParams } from '../types/leave';
import { axiosInstance } from './axiosInstance';

export const fetchLeavesAPI = async (params?: FetchLeavesParams): Promise<Leave[]> => {

  const { data } = await axiosInstance.get('/leaves', {
    params,
  });
  
  return data as Leave[];
};
