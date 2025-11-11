// src/context/TenantContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getTenantByFrontendUrl, Tenant } from "../api/tenantApi";

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
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const frontendUrl = window.location.origin;
        const data = await getTenantByFrontendUrl(frontendUrl);
        setTenant(data);
         localStorage.setItem("tenant", JSON.stringify(data)); // store tenant in localStorage for Axios
     
      } catch (err) {
        setError("Failed to load tenant");
      } finally {
        setLoading(false);
      }
    };
      
    fetchTenant();
  }, []);
 
  return (
    <TenantContext.Provider value={{ tenant, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
};
