import { useMutation } from "@tanstack/react-query";
import type { RegisterTenantData, RegisterTenantResponse } from "../api/tenantApi";
import { registerTenant } from "../api/tenantApi";

export const useTenants = () => {
  const registerTenantMutation = useMutation<RegisterTenantResponse, Error, RegisterTenantData>({
    mutationFn: registerTenant,
  });

  return { registerTenantMutation };
};
