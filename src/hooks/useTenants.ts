import { useMutation,useQuery ,UseQueryOptions} from "@tanstack/react-query";
import type { Tenant ,RegisterTenantData, RegisterTenantResponse } from "../api/tenantApi";
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
