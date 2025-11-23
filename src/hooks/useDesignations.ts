import { useQuery ,useMutation} from "@tanstack/react-query";
import{getDesignations,Designation, getDesignationsByDepartment,AddDesignationData,addDesignation} from "../api/designationApi"


export const useDesignations = (departmentId: string) => {
  return useQuery<Designation[], Error>({
    queryKey: ["designations", departmentId], 
    queryFn: () => getDesignations(departmentId), 
    enabled: !!departmentId, 
  });
};

export const useDesignationsByDepartment = ( departmentId: string) => {
  return useQuery<Designation[], Error>({
    queryKey: ["designations", departmentId],
    queryFn: () => getDesignationsByDepartment( departmentId),
    enabled:  !!departmentId,
  });
};

export const useAddDesignation = () => {
  return useMutation({
    mutationFn: (data: AddDesignationData) => addDesignation(data),
  });
};

export const useDeleteDesignation = ()=>{
  
}
export const useUpdateDesignation = ()=>{
  
}