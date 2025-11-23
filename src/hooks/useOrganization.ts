import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllOrganization, 
  getOrganizationById, 
  createOrganization, 
  updateOrganization, 
  deleteOrganization 
} from "@/api/organizationApi";
import { 
  Organization, 
  CreateOrganizationRequest, 

} from "@/types/organization";

export const useOrganizations = () => {
  return useQuery<Organization[], Error>({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganization.getOrganizations(),
  });
};

export const useOrganizationById = (id: string) => {
  return useQuery<Organization, Error>({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationById.OrganizationById(id),
    enabled: !!id,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateOrganizationRequest) => createOrganization.createOrganization(data),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateOrganizationRequest & { isActive: boolean } }) => 
      updateOrganization.updateOrganization(id, data),     onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", variables.id] });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteOrganization.deleteOrganization(id),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};