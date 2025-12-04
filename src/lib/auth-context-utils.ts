import { User } from "@/types/user";
import { createContext, useContext } from "react";

export type AuthContextType = {
   user: User | null;
  logout: () => void;
  login: (token: string, user: User) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
