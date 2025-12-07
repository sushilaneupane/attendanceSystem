import { useState, useEffect, ReactNode } from "react";
import { useTenant } from "../hooks/useTenants";
import { AuthContext } from "@/lib/auth-context-utils";
import { User } from "@/types/user";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { tenant } = useTenant();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userDataRaw = localStorage.getItem("user");
    let parsedUser: User | null = null;

    if (userDataRaw && userDataRaw !== "undefined") {
      try {
        parsedUser = JSON.parse(userDataRaw);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }

    if (token && parsedUser) {
      if (parsedUser.role === "SuperAdmin") {
        setIsAuthenticated(true);
        setUser(parsedUser);
      } else if (parsedUser.role === "Admin" && tenant) {
        if (parsedUser.tenantId === tenant.id) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        } else {
          logout();
        }
      } else {
        setIsAuthenticated(true);
        setUser(parsedUser);
      }
    }

    setLoading(false);
  }, [tenant]);

  const login = (token: string, userData: User) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
