import { useMutation } from "@tanstack/react-query";
import type { RegisterTenantData, RegisterTenantResponse } from "../api/tenant";
import { registerTenant } from "../api/tenant";

export const useTenants = () => {
  // Use mutationFn syntax with explicit types
  const registerTenantMutation = useMutation<RegisterTenantResponse, Error, RegisterTenantData>({
    mutationFn: registerTenant,
  });

  return { registerTenantMutation };
};
