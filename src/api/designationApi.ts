import { AddDesignationData, DeleteDesignationResponse, Designation, UpdateDesignationData } from "@/types/designation";
import { axiosInstance } from "../api/axiosInstance";

export const getDesignations = async (departmentId: string) => {
  const { data } = await axiosInstance.get(`/Designation`, {
    params: { departmentId }, 
  });
  return data as Designation[];
};

export const getDesignationsByDepartment = async ( departmentId: string) => {
 const res = await axiosInstance.get(`/designation/?DepartmentId:${departmentId}`);
  return res.data.data as Designation[];
};
export const addDesignation = async (data: AddDesignationData) => {
  const response = await axiosInstance.post(`/designation`, data);
  return response.data;
};

export const deleteDesignation = async (id: string): Promise<DeleteDesignationResponse> => {
  const response = await axiosInstance.delete(`/designation/${id}`);
  return response.data;
  
};

export const updateDesignation = async (
  id: string,
  data: UpdateDesignationData
) => {
  const response = await axiosInstance.patch(`/designation/${id}`, data);
  return response.data;
};
