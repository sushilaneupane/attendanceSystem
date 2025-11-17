import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEmployee, getEmployee, registerEmployee } from "@/api/employeeApi";

export const useEmployee= () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: getEmployee,
    select: (response) => response.data,
  });
};
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employee: CreateEmployee) =>
      registerEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};