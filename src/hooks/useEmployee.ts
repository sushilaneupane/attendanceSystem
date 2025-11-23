
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "@/api/employeeApi";

interface UpdateEmployeeParams {
  id: string;
  formData: FormData;
}

export const useEmployee = () =>
  useQuery({
    queryKey: ["employee"],
    queryFn: getEmployee,
    select: (res) => res.data,
  });

  export const useEmployeeById = (id?: string | number) => {
    return useQuery({
      queryKey: ["employee", id],
      queryFn: () => getEmployeeById(id as string | number),
      enabled: !!id,
    });
  }

export const useCreateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => registerEmployee(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employee"] }),
  });
};


export const useUpdateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: UpdateEmployeeParams) => updateEmployee(id, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employee"] }),
  });
};

export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employee"] }),
  });
};
