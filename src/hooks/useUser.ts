
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { loginUser as loginApi, createUser as registerApi, logoutUser as logoutApi } from "../api/usersApi";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import type { UserData, LoginCredentials, ApiResponse } from "../api/usersApi";
import { USER_KEY } from "../utils/queryKeys";
type User = UserData; 


type LoginMutationResult = ApiResponse<{
  token: string;
  userDto: User;
}>;


type RegisterMutationResult = ApiResponse;


type LogoutMutationResult = ApiResponse;

export function useUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  if (!auth) throw new Error("useUser must be used inside AuthProvider");

  const login: UseMutationResult<LoginMutationResult, unknown, LoginCredentials> = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      auth.login(data.data.token, data.data.userDto); 
      toast.success("Logged in successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  
  const registerUser: UseMutationResult<RegisterMutationResult, unknown, UserData> = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Registered successfully! Please login.");
    },
  });

 
  const logout: UseMutationResult<LogoutMutationResult, unknown> = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      auth.logout(); 
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Logged out successfully!");
    },
  });

  return { login, registerUser, logout };
}
