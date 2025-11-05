import axios from "axios";

const apiUrl = (import.meta as any).env?.VITE_BASE_URL as string;

export const getDepartments = async () => {
  const response = await axios.get(`${apiUrl}/departments`);
  return response.data;
};
