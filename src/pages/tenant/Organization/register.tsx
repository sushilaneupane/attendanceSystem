import React, { useEffect } from "react";

import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "@/components/Form/ControlledInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {

  OrganizationFormValues,

} from "@/types/organization";
import {
  organizationFormSchema,
 
  getDefaultValues,
} from "@/Validator/organization"
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
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: getDefaultValues(initialData),
  mode: "onChange", 
    reValidateMode: "onChange", 
    
  });

 
  useEffect(() => {
    if (initialData) {
      form.reset(getDefaultValues(initialData));
    }
  }, [initialData, form]);

  const handleFormSubmit = (data: OrganizationFormValues) => {
    
    const formattedData: OrganizationFormValues = {
      ...data,
      contractDate: data.contractDate, 
      amcRenewDate: data.amcRenewDate, 
      subscriptionEndDate: data.subscriptionEndDate, 
    };

    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 max-h-96 overflow-y-auto p-1"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          <ControlledInput
            control={form.control}
            name="name"
            label="Organization Name"
            placeholder="Enter organization name"
              errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="deviceName"
            label="Device Name"
            placeholder="Enter device name"
             errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="clientEmail"
            label="Email"
     errors={form.formState.errors}
            placeholder="Enter client email"
          />
          
          <ControlledInput
            control={form.control}
            name="clientPhoneNo"
            label="Phone Number"
            placeholder="Enter phone number"
             errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="billAmount"
            label="Bill Amount"
          errors={form.formState.errors}
            placeholder="Enter bill amount"
          />
          
          <ControlledInput
            control={form.control}
            name="billNumber"
            label="Bill Number"
            placeholder="Enter bill number"
             errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="annualMaintenanceContractAmount"
            label="AMC Amount"
           errors={form.formState.errors}
            placeholder="Enter AMC amount"
          />

          <FormField
            control={form.control}
            name="subscription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription Type</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  >
                    <option value={1}>Basic</option>
                    <option value={2}>Professional</option>
                    <option value={3}>Enterprise</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        
          <ControlledInput
            control={form.control}
            name="contractDate"
            label="Contract Date"
            type="date"
             errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="amcRenewDate"
            label="AMC Renew Date"
             errors={form.formState.errors}
            type="date"
          />
          
          <ControlledInput
            control={form.control}
            name="subscriptionEndDate"
            label="Subscription End Date"
            type="date"
             errors={form.formState.errors}
          />

     
          <ControlledInput
            control={form.control}
            name="website"
            label="Website"
            placeholder="https://example.com"
             errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="contractDocument"
            label="Contract Document"
            placeholder="Contract document reference"
             errors={form.formState.errors}
          />
          
          <ControlledInput
            control={form.control}
            name="logo_url"
            label="Logo URL"
            placeholder="Logo image URL"
             errors={form.formState.errors}
          />
        </div>

       
        <FormField
          control={form.control}
          
          name="clientAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter full client address" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


       
       
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Saving..." : isEdit ? "Update Organization" : "Add Organization"}
        </Button>
      </form>
    </Form>
  );
};