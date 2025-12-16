import { SubscriptionTypes } from "@/types/enum/org";
import { z } from "zod";
export const organizationFormSchema = z.object({
 
  name: z.string().min(1, "Organization name is required"),
  clientAddress: z.string().min(1, "Client address is required"),
  billAmount: z.string().min(1, "Bill amount is required"),
  billNumber: z.string().min(1, "Bill number is required"),
  annualMaintenanceContractAmount: z.string().min(1, "AMC amount is required"),
  contractDate: z.string().min(1, "Contract date is required"),
  amcRenewDate: z.string().min(1, "AMC renew date is required"),
  clientPhoneNo:  z.string()
  .regex(/^\d{10}$/, "invalid phone number"),
  clientEmail: z.email(""),
  deviceName: z.string().min(1, "Device name is required"),
  subscriptionEndDate: z.string().min(1, "Subscription end date is required"),
  contractDocument: z.string().optional(),
  website: z.url("Please enter a valid URL").optional().or(z.literal("")),
  logo_url: z.string().optional(),
  isActive: z.boolean(),
  subscription: z.nativeEnum(SubscriptionTypes,  "Please select a valid subscription type" ),
 
});
export type OrganizationFormValues = z.infer<typeof organizationFormSchema>;
export interface Organization {
  id: string;
  name: string;
  clientAddress: string;
  billAmount: string;
  billNumber: string;
  annualMaintenanceContractAmount: string;
  contractDate: string;
  contractDocument: string;
  amcRenewDate: string;
  website: string;
  clientPhoneNo: string;
  clientEmail: string;
  logo_url: string;
  isActive: boolean;
  createdAt: string;
  deviceName: string;
  subscription: SubscriptionTypes;
  subscriptionEndDate: string;
}
export const getDefaultValues = (initialData?: Partial<OrganizationFormValues>): OrganizationFormValues => ({
  name: initialData?.name ?? "",
  clientAddress: initialData?.clientAddress ?? "",
  billAmount: initialData?.billAmount ?? "",
  billNumber: initialData?.billNumber ?? "",
  annualMaintenanceContractAmount: initialData?.annualMaintenanceContractAmount ?? "",
  contractDate: initialData?.contractDate ?? "",
  contractDocument: initialData?.contractDocument ?? "",
  amcRenewDate: initialData?.amcRenewDate ?? "",
  website: initialData?.website ?? "",
  clientPhoneNo: initialData?.clientPhoneNo ?? "",
  clientEmail: initialData?.clientEmail ?? "",
  logo_url: initialData?.logo_url ?? "",
  isActive: initialData?.isActive ?? true,
  deviceName: initialData?.deviceName ?? "",
  subscription: initialData?.subscription ?? SubscriptionTypes.Basic,
 
  subscriptionEndDate: initialData?.subscriptionEndDate ?? "",
});