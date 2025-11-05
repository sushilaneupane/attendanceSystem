// src/hooks/useDepartments.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

// Type for a single department (update based on your API)
export interface Department {
  id: number;
  name: string;
  description?: string;
}

// Fetch function
const fetchDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(`${apiUrl}/Departments`);
  return response.data;
};

// Hook using React Query
export const useDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });
};
