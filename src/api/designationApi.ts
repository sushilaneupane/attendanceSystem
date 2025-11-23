import { axiosInstance } from "../api/axiosInstance";

export interface Designation {
  designationId: string;
  designationName: string;
  departmentId: string;
  
  isActive: boolean;
}
export interface AddDesignationData{
   departmentId: string;
  designationName: string;

}
export interface DeleteDesignationResponse {
  success: boolean;
}
export const getDesignations = async (departmentId: string) => {
  const { data } = await axiosInstance.get(`/Designation`, {
    params: { departmentId }, 
  });
  return data as Designation[];
};


export const getDesignationsByDepartment = async ( departmentId: string) => {
 const res = await axiosInstance.get(`/Designation/${departmentId}/Department`);
  return res.data.data as Designation[];
};
export const addDesignation = async (data: AddDesignationData) => {
  const response = await axiosInstance.post(`/Designation`, data);
  return response.data;
};

export const deleteDesignation = async (id: string): Promise<DeleteDesignationResponse> => {
  const response = await axiosInstance.delete(`/Designation/${id}`);
  return response.data;
};


