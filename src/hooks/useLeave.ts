
import { useQuery } from '@tanstack/react-query';
import { fetchLeavesAPI } from '@/api/leaveApi';
import { Leave, FetchLeavesParams } from '../types/leave';

export const useLeaves = (params?: FetchLeavesParams) => {
  return useQuery<Leave[], Error>({
    queryKey: ['leaves', params],
    queryFn: () => fetchLeavesAPI(params),  
  });
};
