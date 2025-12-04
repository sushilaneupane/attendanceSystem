import { z } from "zod";
export enum MarriedStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
}
export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export const employeeSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  dateOfJoining: z.date(),
  email: z.string().email().max(100).optional(),
  contactNumber1: z.string().max(20).optional(),
  contactNumber2: z.string().max(20).optional(),
  address: z.string().max(250).optional(),
  dateOfBirth: z.date(),
  description: z.string().max(500).optional(),
  deviceUserId: z.number().int().nonnegative(),
  isActive: z.boolean(),
  marriedStatus: z.nativeEnum(MarriedStatus),
  gender: z.nativeEnum(Gender),
  designationId: z.string().uuid(),
  designationName: z.string().max(100).optional(),
  departmentId: z.string().uuid(),
  departmentName: z.string().max(100).optional(),
  imageUrl: z.string().url().optional(),
});
export type GetEmployeeDto = z.infer<typeof employeeSchema>;
