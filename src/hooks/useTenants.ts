import { useMutation,useQuery } from "@tanstack/react-query";
import type { Tenant ,RegisterTenantData, RegisterTenantResponse } from "../api/tenantApi";
import { getAllTenants, registerTenant } from "../api/tenantApi";

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