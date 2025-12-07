import { useQuery } from '@tanstack/react-query';
import { fetchLeavesAPI } from '@/api/leaveApi';
import { LeavesApiResponse, FetchLeavesParams } from '../types/leave';

export const useLeaves = (params?: FetchLeavesParams) => {
  return useQuery<LeavesApiResponse, Error>({
    queryKey: ['leaves', params],
    queryFn: () => fetchLeavesAPI(params),
  });
};
