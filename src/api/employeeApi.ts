import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfJoining: string;
  email: string;
  contactNumber1: string;
  contactNumber2: string;
  address: string;
  dateOfBirth: string;
  description: string;
  deviceUserId: number;
  isActive: boolean;
  marriedStatus: number;
  gender: number;
  designationId: string;
  designationName: string;
  departmentId: string;
  departmentName: string;
}

export interface EmployeeApiResponse {
  success: boolean;
  errorMessage: string | null;
  detailErrorMessage: string | null;
  data: Employee[];
  statusCode: number;
}

export const getEmployeesApi = async (
  tenantId: string,
  token?: string
): Promise<EmployeeApiResponse> => {
  try {
    const response = await axios.get<EmployeeApiResponse>(
      `${apiUrl}/Employee`,
      {
        headers: {
          "X-Tenant-ID": tenantId,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
export const addEmployeeApi = async (
  tenantId: string,
  employeeData: Omit<Employee, "id">,
  token?: string
): Promise<EmployeeApiResponse> => {
  try {
    const response = await axios.post<EmployeeApiResponse>(
      `${apiUrl}/Employee`,
      employeeData,
      {
        headers: {
          "X-Tenant-ID": tenantId,
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding employee:", error);
    throw error;
  }
};
