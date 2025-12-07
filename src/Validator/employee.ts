import { z } from "zod";
import { marriedStatusEnum } from "@/types/enum/marriedStatus";
import { GenderEnum} from "@/types/enum/gender";

export const employeeSchema = z.object({
  
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  dateOfJoining: z.string().date(),
  email: z.string().email().max(100).optional(),
  contactNumber1: z.string().max(20).optional(),
  contactNumber2: z.string().max(20).optional(),
  address: z.string().max(250).optional(),
  dateOfBirth: z.string().date(),
  description: z.string().max(500).optional(),
  deviceUserId: z.number().int().nonnegative(),
  isActive: z.boolean(),
  marriedStatus: z.nativeEnum(marriedStatusEnum),
  gender: z.nativeEnum(GenderEnum),
  designationId: z.string().uuid(),
  designationName: z.string().max(100).optional(),
  departmentId: z.string().uuid(),
  departmentName: z.string().max(100).optional(),
  imageUrl: z.string().url().optional(),
});
// Schema for editing (includes id, no password required)
export const employeeEditSchema = employeeSchema.extend({
  id: z.string().uuid(),
  designationName: z.string().max(100).optional(),
  departmentName: z.string().max(100).optional(),
  imageUrl: z.string().optional(),
});
export const employeeCreateSchema = employeeSchema.extend({
  Password: z.string().min(6, "Password must be at least 6 characters"),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
