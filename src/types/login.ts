export interface UserData {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  username?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
  role?: string;
}
export interface LoginCredentials {
   UserName: string;   
  Password: string; 
}
export interface ApiResponse<T = unknown> {
  isActive: boolean;
  data: T;
  message?: string;
  status?: string;
} 
export interface LoginData {
  token: string;
  userDto: UserData;
  role?: string[];
}
export type LoginApiResponse = ApiResponse<LoginData>;
