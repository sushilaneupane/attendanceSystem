import { useMutation,useQuery } from "@tanstack/react-query";
import  { Tenant ,RegisterTenantData, RegisterTenantResponse } from "@/types/tenant";
import { getAllTenants, registerTenant } from "../api/tenantApi";

import { getTenantByFrontendUrl } from "../api/tenantApi";
export const useRegisterTenants = () => {

  const registerTenantMutation = useMutation<RegisterTenantResponse, Error, RegisterTenantData>({
    mutationFn: registerTenant,
  });

  return { registerTenantMutation };
};

export const useTenantsQuery = () => {
  return useQuery<Tenant[], Error>({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
    
  });
}

export const useTenantByFrontendUrl = (frontendUrl: string,) => {
  return useQuery<Tenant, Error>({
    queryKey: ["tenant", frontendUrl], 
    queryFn: () => getTenantByFrontendUrl(frontendUrl),
    
  });
};
