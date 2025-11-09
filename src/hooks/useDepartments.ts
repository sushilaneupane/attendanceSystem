import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDepartments,
  registerDepartment,
  updateDepartment,
  deleteDepartment,
  CreateDepartment,
  Department,
} from "../api/departmentApi";

export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
    select: (response) => response.data,
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (department: CreateDepartment) =>
      registerDepartment(department),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      department,
    }: {
      id: string;
      department: CreateDepartment;
    }) => updateDepartment(id, department),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
