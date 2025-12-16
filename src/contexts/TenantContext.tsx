import {ReactNode, useEffect } from "react";
import { useTenantByFrontendUrl } from "../hooks/useTenants";
import { Tenant } from "@/types/tenant";
import { TenantContext } from "./TenantContextValue";
export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const frontendUrl = "attendancebe.hamrosystem.com";
  const { data, isLoading, isError, error } = useTenantByFrontendUrl(frontendUrl);

  const tenantData: Tenant | null = data ?? null;

  useEffect(() => {
    if (tenantData) {
      localStorage.setItem("tenant", JSON.stringify(tenantData));
    } else {
      localStorage.removeItem("tenant");
    }
  }, [tenantData]);

  return (
    <TenantContext.Provider
      value={{
        tenant: tenantData,
        loading: isLoading,
        error: isError ? (error?.message || "Failed to load tenant") : null,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};
