import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useTenant } from "./TenantContext";

export interface User {
  id?: string;
  username?: string;
  email?: string;
    role?: string; 

  [key: string]: any;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { tenant } = useTenant();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      if (parsedUser.role === "Admin" && tenant) {
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
    if (userData.role === "Admin" && tenant) {
      userData.tenantId = tenant.id;
    }
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
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
