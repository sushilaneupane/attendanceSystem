import { OrganizationFormValues } from "@/Validator/organization";


export type { OrganizationFormValues } from "@/Validator/organization";
export { getDefaultValues } from "@/Validator/organization";


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
  subscription: number;
  subscriptionEndDate: string;
}


export type CreateOrganizationRequest = OrganizationFormValues;

export type UpdateOrganizationRequest = OrganizationFormValues & {
  isActive: boolean;
};


export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errorMessage?: string;
}


export type OrganizationCreateData = OrganizationFormValues;
export type OrganizationUpdateData = OrganizationFormValues & { id: string };


export interface OrganizationFormProps {
  onSubmit: (data: OrganizationFormValues) => void;
  isLoading?: boolean;
  initialData?: Partial<OrganizationFormValues>;
  isEdit?: boolean;
}


export interface CreateOrganizationMutation {
  data: CreateOrganizationRequest;
}

export interface UpdateOrganizationMutation {
  id: string;
  data: UpdateOrganizationRequest;
}

export interface DeleteOrganizationMutation {
  id: string;
}