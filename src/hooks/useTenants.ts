import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Tenant, RegisterTenantData, RegisterTenantResponse } from "@/types/tenant";
import { getAllTenants, getTenantByFrontendUrl, registerTenant } from "../api/tenantApi";
import { TenantContext } from "@/contexts/TenantContextValue";

export const useTenant = () => useContext(TenantContext);
export const useTenantsQuery = () => {
  return useQuery<Tenant[], Error>({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });
};
export const useTenantByFrontendUrl = (frontendUrl: string) => {
  return useQuery<Tenant, Error>({
    queryKey: ["tenant", frontendUrl],
    queryFn: () => getTenantByFrontendUrl(frontendUrl),
  });
};
export const useRegisterTenants = () => {
  const registerTenantMutation = useMutation<RegisterTenantResponse, Error, RegisterTenantData>({
    mutationFn: registerTenant,
  });

  return { registerTenantMutation };
};
