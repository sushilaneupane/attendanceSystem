import { z } from "zod";
import { marriedStatusEnum } from "@/types/enum/marriedStatus";
import { GenderEnum} from "@/types/enum/gender";

export const employeeSchema = z.object({
  firstName: z.string().max(50, "First name must be at most 50 characters"),
  lastName: z.string().max(50, "Last name must be at most 50 characters"),
  email: z.string("email must be valid format").email().max(100).optional(),
  contactNumber1: z.string("contact number 1 is required").max(20).optional(),
  contactNumber2: z.string("contact number 2 is required").max(20).optional(),
  address: z.string("address is required").max(250).optional(),
  dateOfBirth: z.string("Invalid date format for Date of Birth"),
  description: z.string().max(500).optional(),
  deviceUserId: z.number().int().nonnegative(),
  isActive: z.boolean(),
  marriedStatus: z.nativeEnum(marriedStatusEnum),
  dateOfJoining: z.string("Invalid date format for Date of Joining"),
  gender: z.nativeEnum(GenderEnum),
  designationId: z.string().uuid(),
  designationName: z.string().max(100).optional(),
  departmentId: z.string().uuid(),
  departmentName: z.string().max(100).optional(),
  imageUrl: z.string().url().optional(),
   Password: z.string().min(6, "Password must be at least 7 characters"),
});

export const employeeEditSchema = employeeSchema.extend({
  id: z.string().uuid(),
  designationName: z.string().max(100).optional(),
  departmentName: z.string().max(100).optional(),
  imageUrl: z.string().optional(),
});
export const employeeCreateSchema = employeeSchema.extend({
 

  
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
export type EditFormValues = z.infer<typeof employeeEditSchema>;
