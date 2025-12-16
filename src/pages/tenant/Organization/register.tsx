import React, { useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "@/components/Form/ControlledInput";
import { ControlledSelect } from "@/components/Form/ControlledSelect";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  OrganizationFormValues,
} from "@/types/organization";
import {
  organizationFormSchema,
  getDefaultValues,
} from "@/Validator/organization"
import { Label } from "@radix-ui/react-label";
import { SubscriptionTypes } from "@/types/enum/org";
interface OrganizationFormProps {
  onSubmit: (data: OrganizationFormValues) => void;
  isLoading?: boolean;
  initialData?: Partial<OrganizationFormValues>;
  isEdit?: boolean;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
  isEdit = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: getDefaultValues(initialData),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      reset(getDefaultValues(initialData));
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: OrganizationFormValues) => {
    const formattedData: OrganizationFormValues = {
      ...data,
      contractDate: data.contractDate,
      amcRenewDate: data.amcRenewDate,
      subscriptionEndDate: data.subscriptionEndDate,
    };
    onSubmit(formattedData);
  };
    const subscriptionOptions = Object.entries(SubscriptionTypes)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      label: key,
      value: value as number,
    }));
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6 max-h-96 overflow-y-auto p-1"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
        <ControlledInput
          control={control}
          name="name"
          label="Organization Name"
          placeholder="Enter organization name"
          errors={errors}
        />
        
    
        <ControlledInput
          control={control}
          name="deviceName"
          label="Device Name"
          placeholder="Enter device name"
          errors={errors}
        />
        
       
        <ControlledInput
          control={control}
          name="clientEmail"
          label="Email"
          placeholder="Enter client email"
          errors={errors}
        />
        
        
        <ControlledInput
          control={control}
          name="clientPhoneNo"
          label="Phone Number"
          placeholder="Enter phone number"
          errors={errors}
        />
       
        <ControlledInput
          control={control}
          name="billAmount"
          label="Bill Amount"
          placeholder="Enter bill amount"
          type="number"
          errors={errors}
        />
        
     
        <ControlledInput
          control={control}
          name="billNumber"
          label="Bill Number"
          placeholder="Enter bill number"
          errors={errors}
        />
        
        
        <ControlledInput
          control={control}
          name="annualMaintenanceContractAmount"
          label="AMC Amount"
          placeholder="Enter AMC amount"
          type="number"
          errors={errors}
        />

       
        <ControlledSelect
          control={control}
          name="subscription"
          label="Subscription Type"
          placeholder="Select subscription type"
          options={subscriptionOptions}
          errors={errors}
        />

      
        <ControlledInput
          control={control}
          name="contractDate"
          label="Contract Date"
          type="date"
          errors={errors}
        />
        
     
        <ControlledInput
          control={control}
          name="amcRenewDate"
          label="AMC Renew Date"
          type="date"
          errors={errors}
        />
        
        
        <ControlledInput
          control={control}
          name="subscriptionEndDate"
          label="Subscription End Date"
          type="date"
          errors={errors}
        />

        
        <ControlledInput
          control={control}
          name="website"
          label="Website"
          placeholder="https://example.com"
          type="url"
          errors={errors}
        />
        
       
        <ControlledInput
          control={control}
          name="contractDocument"
          label="Contract Document"
          placeholder="Contract document reference"
          errors={errors}
        />
        
     
        <ControlledInput
          control={control}
          name="logo_url"
          label="Logo URL"
          placeholder="Logo image URL"
          type="url"
          errors={errors}
        />
      </div>

      
      <div className="flex flex-col gap-1">
        <Label htmlFor="clientAddress">
          Client Address
        </Label>
      
        <Textarea
          id="clientAddress"
          placeholder="Enter full client address"
          {...control.register("clientAddress")}
        />
        {errors.clientAddress && (
          <p className="text-sm text-red-500 min-h-2">
            {errors.clientAddress.message as string}
          </p>
        )}
      </div>

     
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? "Saving..." : isEdit ? "Update Organization" : "Add Organization"}
      </Button>
    </form>
  );
};