export interface RegisterTenantData {
  name: string;
  server: string;
  database: string;
  useWindowsAuth: boolean;
  userId: string | null;
  password: string | null;
  frontendUrl: string;
}
export interface RegisterTenantResponse {
  name: string;
  server: string;
  database: string;
  useWindowsAuth: boolean;
  userId: string | null;
  password: string | null;
  frontendUrl: string;
}
export interface Tenant {
  id: string;
  name: string;
  frontendUrl: string;
  isActive: boolean;
  createdAt: string;

}
