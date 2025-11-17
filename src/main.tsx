import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { TenantProvider } from "./contexts/TenantContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <TenantProvider>
      <AuthProvider>
        
        <App />
     
      </AuthProvider>
         </TenantProvider>
      
    </QueryClientProvider>
  </React.StrictMode>
);

