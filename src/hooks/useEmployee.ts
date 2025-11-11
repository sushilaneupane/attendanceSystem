import { useState, useEffect, useCallback } from "react";
import { Employee, getEmployeesApi,addEmployeeApi } from "../api/employeeApi";

export const useEmployeeApi = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tenantId = localStorage.getItem("tenantId") || "";
  const token = localStorage.getItem("token") || "";

  const fetchEmployees = async () => {
    if (!tenantId) {
      setError("Tenant ID not found. Please login.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getEmployeesApi(tenantId, token);
      if (data.success) setEmployees(data.data);
      else setError(data.errorMessage || "Failed to fetch employees");
    } catch (err) {
      setError("Something went wrong while fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, refetch: fetchEmployees };
};


