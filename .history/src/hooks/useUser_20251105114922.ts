// src/hooks/useUser.ts
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { loginUser as loginApi, createUser as registerApi, logoutUser as logoutApi } from "";
import { useAuth } from "../contexts/authContext";
import { toast } from "sonner";
import type { UserData, LoginCredentials, ApiResponse } from "../api/usersApi";
import type { User } from "@/types/User"; // adjust if you have a User type

// Define types for login mutation
type LoginMutationResult = ApiResponse<{
  token: string;
  userDto: User;
}>;

// Define types for register mutation
type RegisterMutationResult = ApiResponse;

// Define types for logout mutation
type LogoutMutationResult = ApiResponse;

export function useUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();
  if (!auth) throw new Error("useUser must be used inside AuthProvider");

  // Login Mutation
  const login: UseMutationResult<LoginMutationResult, unknown, LoginCredentials> = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      auth.login(data.data.token, data.data.userDto); 
      toast.success("Logged in successfully!");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Register Mutation
  const registerUser: UseMutationResult<RegisterMutationResult, unknown, UserData> = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Registered successfully! Please login.");
    },
  });

  // Logout Mutation
  const logout: UseMutationResult<LogoutMutationResult, unknown> = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      auth.logout(); 
      queryClient.invalidateQueries(["users"]);
      toast.success("Logged out successfully!");
    },
  });

  return { login, registerUser, logout };
}
