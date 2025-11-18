import * as z from "zod";
export const tenantRegisterSchema = z.object({
  name: z.string().min(3, "Company name must be at least 3 characters"),
  server: z.string().min(1, "Server is required"),
  database: z.string().min(1, "Database is required"),
  useWindowsAuth: z.boolean(),
  userId: z.string().optional(),
  password: z.string().optional(),
  frontendUrl: z
    .string()
    .min(3, "Frontend subdomain is required")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
});