import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;
import { getDepartments} from "../api/departmentApi"
import{ Department} from "../api/departmentApi"


export const useDepartments = () => {
  return useQuery<Department[], Error>({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await getDepartments();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false, 
  });
};

