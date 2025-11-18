import { useQuery ,useMutation} from "@tanstack/react-query";
import{getDesignations, getDesignationsByDepartment,addDesignation, deleteDesignation,  updateDesignation} from "../api/designationApi"
import {Designation,AddDesignationData,UpdateDesignationData,} from "@/types/designation"


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
  return useMutation({
    mutationFn: (id:string) => deleteDesignation(id)
  })
  
}
export const useUpdateDesignation = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDesignationData;
    }) => updateDesignation(id, data),
  });
};