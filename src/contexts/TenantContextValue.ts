// src/contexts/TenantContextValue.ts
import { createContext } from "react";
import { TenantContextType } from "@/types/tenantContext";

export const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
  error: null,
});
