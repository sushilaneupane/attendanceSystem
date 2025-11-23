import { Tenant } from "@/types/tenant";
export interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  error: string | null;
}
