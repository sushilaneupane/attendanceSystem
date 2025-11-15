import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useTenantByFrontendUrl } from "../hooks/useTenants"; // the hook we created
import { Tenant } from "../api/tenantApi";

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
});

export const useTenant = () => useContext(TenantContext);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const frontendUrl = "Ajay"; 
  const { data, isLoading, isError, error } = useTenantByFrontendUrl(frontendUrl);
const tenantData: Tenant | null = data ?? null;

useEffect(() => {
  if(tenantData){
    localStorage.setItem("tenant",JSON.stringify(tenantData))
  }
})
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
