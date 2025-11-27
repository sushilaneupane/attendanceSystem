import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useTenantByFrontendUrl } from "../hooks/useTenants"; 

import { Tenant } from "@/types/tenant";
import { TenantContextType } from "@/types/tenantContext";


const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
});

export const useTenant = () => useContext(TenantContext);
export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const frontendUrl = "attendancebe.hamrosystem.com"; 
  const { data, isLoading, isError, error } = useTenantByFrontendUrl(frontendUrl);
const tenantData: Tenant | null = data ?? null;

useEffect(() => {
  if(tenantData){
    localStorage.setItem("tenant",JSON.stringify(tenantData))
  }else if(!tenantData){
    localStorage.removeItem("tenant");
  }
  
},[tenantData])
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