import { useQuery,useQueryClient,useMutation } from '@tanstack/react-query';
import { deleteLeave, fetchLeavesAPI, updateLeave } from '@/api/leaveApi';
import { LeavesApiResponse, FetchLeavesParams, UpdateLeaveData } from '../types/leave';

export const useLeaves = (params?: FetchLeavesParams) => {
  return useQuery<LeavesApiResponse, Error>({
    queryKey: ['leaves', params],
    queryFn: () => fetchLeavesAPI(params),
  });
};
export const useDeleteLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteLeave(id),

    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};
export const useUpdateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeaveData }) =>
      updateLeave(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};