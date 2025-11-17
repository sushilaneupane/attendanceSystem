import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployee } from "@/api/employeeApi";

export const useEmployee= () => {
  return useQuery({
    queryKey: ["Employee"],
    queryFn: getEmployee,
    select: (response) => response.data,
  });
};