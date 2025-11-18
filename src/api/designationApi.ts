import { AddDesignationData, DeleteDesignationResponse, Designation, UpdateDesignationData } from "@/types/designation";
import { axiosInstance } from "../api/axiosInstance";

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

export const updateDesignation = async (
  id: string,
  data: UpdateDesignationData
) => {
  const response = await axiosInstance.patch(`/Designation/${id}`, data);
  return response.data;
};

