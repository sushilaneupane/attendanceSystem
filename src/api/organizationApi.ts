import { axiosInstance } from "./axiosInstance";
import {
  Organization,
  CreateOrganizationRequest,
  
  ApiResponse,
} from "@/types/organization";
export const getAllOrganization = {
  getOrganizations: async (): Promise<Organization[]> => {
    const response = await axiosInstance.get<ApiResponse<Organization[]>>(
      "/organization"
    );
    if (!response.data.success) {
      throw new Error(
        response.data.errorMessage || "Failed to fetch organizations"
      );
    }
    return response.data.data;
  },
};
export const getOrganizationById = {
  OrganizationById: async (id: string): Promise<Organization> => {
    const response = await axiosInstance.get<ApiResponse<Organization>>(
      `/organization/${id}`
    );
    if (!response.data.success) {
      throw new Error(
        response.data.errorMessage || "Failed to fetch organization"
      );
    }
    return response.data.data;
  },
};

export const createOrganization = {
  createOrganization: async (
    data: CreateOrganizationRequest
  ): Promise<Organization> => {
    const response = await axiosInstance.post<ApiResponse<Organization>>(
      "/organization",
      data
    );
    if (!response.data.success) {
      throw new Error(
        response.data.errorMessage || "Failed to create organization"
      );
    }
    return response.data.data;
  },
};

export const updateOrganization = {
  updateOrganization: async (id:string,
    data: CreateOrganizationRequest & { isActive: boolean }
  ): Promise<Organization> => {
    const response = await axiosInstance.patch<ApiResponse<Organization>>(
      `/organization/${id}`,
      data
    );
    if (!response.data.success) {
      throw new Error(
        response.data.errorMessage || "Failed to update organization"
      );
    }
    return response.data.data;
  },
};
export const deleteOrganization = {
  deleteOrganization: async (id: string): Promise<void> => {
    const response = await axiosInstance.delete<ApiResponse<void>>(
      `/organization/${id}`
    );
    if (!response.data.success) {
      throw new Error(
        response.data.errorMessage || "Failed to delete organization"
      );
    }
  },
};
