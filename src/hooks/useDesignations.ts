import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDesignations,
  getDesignationsByDepartment,
  addDesignation,
  deleteDesignation,
  updateDesignation,
} from "../api/designationApi";
import {
  Designation,
  AddDesignationData,
  UpdateDesignationData,
} from "@/types/designation";


export const useDesignations = (departmentId: string) => {
  return useQuery<Designation[], Error>({
    queryKey: ["designations", departmentId],
    queryFn: () => getDesignations(departmentId),
    enabled: !!departmentId,
  });
};

export const useDesignationsByDepartment = (departmentId: string) => {
  return useQuery<Designation[], Error>({
    queryKey: ["designations", departmentId],
    queryFn: () => getDesignationsByDepartment(departmentId),
    enabled: !!departmentId,
  });
};

export const useAddDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddDesignationData) => addDesignation(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
    },
  });
};


export const useDeleteDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDesignation(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
    },
  });
};


export const useUpdateDesignation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDesignationData;
    }) => updateDesignation(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
    },
  });
};
