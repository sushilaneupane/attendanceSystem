import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser as loginApi,
  createUser as registerApi,
  logoutUser as logoutApi,
} from "@/api/loginApi";
import { useAuth } from "@/lib/auth-context-utils";
import { toast } from "sonner";

import type {
  UserData,
  LoginCredentials,
  ApiResponse,
  LoginApiResponse,
} from "@/types/login";

export function useUser() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  if (!auth) {
    throw new Error("useUser must be used inside AuthProvider");
  }

  const login = useMutation<LoginApiResponse, unknown, LoginCredentials>({
    mutationFn: loginApi,
    onSuccess: (response) => {
      const { token, userDto } = response.data;

      auth.login(token, userDto);
      toast.success("Logged in successfully!");

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const registerUser = useMutation<ApiResponse, unknown, UserData>({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success("Registered successfully! Please login.");
    },
  });

  const logout = useMutation<ApiResponse>({
    mutationFn: logoutApi,
    onSuccess: () => {
      auth.logout();

      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Logged out successfully!");
    },
  });

  return {
    login,
    registerUser,
    logout,
  };
}
