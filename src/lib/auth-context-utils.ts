import { createContext, useContext } from "react";
import type { UserData } from "@/types/login";

export type AuthContextType = {
  user: UserData | null;
  login: (token: string, user: UserData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
