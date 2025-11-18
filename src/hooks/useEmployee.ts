import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateEmployee,
  getEmployee,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/api/employeeApi";
import { Employee } from "@/api/employeeApi"; // assuming this is the type

// Fetch all employees
export const useEmployee = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: getEmployee,
    select: (response) => response.data,
  });
};

// Create a new employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employee: CreateEmployee) => registerEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};

// Update an existing employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, employee }: { id: string; employee: CreateEmployee }) =>
      updateEmployee(id, employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};


export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
  });
};
