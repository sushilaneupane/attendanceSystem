export interface UserData {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  username?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  role?: string;
}
export interface LoginCredentials {
   Email: string;
  password: string;
}
export interface ApiResponse<T = any> {
  isActive: any;
  data: T;
  message?: string;
  status?: string;
}