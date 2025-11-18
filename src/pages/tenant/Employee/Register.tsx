import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { ControlledInput } from "@/components/Form/ControlledInput";
import { ControlledSelect } from "@/components/Form/ControlledSelect";

import { useDepartments } from "@/hooks/useDepartments";
import { useDesignationsByDepartment } from "@/hooks/useDesignations";


const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").nullable().optional(),
  contactNumber1: z.string().min(10, "Phone must be 10 digits"),
  contactNumber2: z.string().optional(),
  address: z.string().min(2, "Address required"),
  dateOfJoining: z.string().min(1, "Date required"),
  dateOfBirth: z.string().min(1, "Date required"),
  description: z.string().optional(),
  deviceUserId: z.coerce.number(),
  isActive: z.boolean(),
  marriedStatus: z.coerce.number(),
  gender: z.coerce.number(),
  designationId: z.string().uuid("Invalid designation"),
  departmentId: z.string().uuid("Invalid department"),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EmployeeForm() {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber1: "",
      contactNumber2: "",
      address: "",
      dateOfJoining: "",
      dateOfBirth: "",
      description: "",
      deviceUserId: 0,
      isActive: true,
      marriedStatus: 1,
      gender: 1,
      designationId: "",
      departmentId: "",
    },
  });

  const selectedDepartmentId = watch("departmentId");


  const { data: departments } = useDepartments();


  const {
    data: designations,
    isLoading: isDesignationLoading,
    refetch,
  } = useDesignationsByDepartment(selectedDepartmentId);

  useEffect(() => {
    if (selectedDepartmentId) refetch();
  }, [selectedDepartmentId]);


  const departmentOptions =
    departments?.map((d) => ({
      label: d.name,
      value: d.id,
    })) ?? [];


  const designationOptions =
    designations?.map((d) => ({
      label: d.designationName,
      value: d.designationId,
    })) ?? [];

  const marriedStatusOptions = [
    { label: "Single", value: 1 },
    { label: "Married", value: 2 },
  ];

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];

  const onSubmit = (data: EmployeeFormValues) => {
    console.log("Employee Data Submitted:", data);
  };

  return (

    <div className="grid grid-cols-2 gap-5 ">
      <div>
        <ControlledInput
          name="firstName"
          control={control}
          label="First Name"
          placeholder="Enter first name"
          errors={errors}
        />

        <ControlledInput
          name="lastName"
          control={control}
          label="Last Name"
          placeholder="Enter last name"
          errors={errors}
        />

        <ControlledInput
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          errors={errors}
        />

        <ControlledInput
          name="contactNumber1"
          control={control}
          label="Primary Contact"
          placeholder="9863xxxxxx"
          errors={errors}
        />

        <ControlledInput
          name="contactNumber2"
          control={control}
          label="Secondary Contact"
          placeholder="Optional"
          errors={errors}
        />

        <ControlledInput
          name="address"
          control={control}
          label="Address"
          placeholder="Enter address"
          errors={errors}
        />

        <ControlledInput
          name="dateOfJoining"
          control={control}
          label="Date Of Joining"
          type="date"
          errors={errors}
        />
      </div>
      <div>
        <ControlledInput
          name="dateOfBirth"
          control={control}
          label="Date Of Birth"
          type="date"
          errors={errors}
        />

        <ControlledInput
          name="description"
          control={control}
          label="Description"
          placeholder="Short description"
          errors={errors}
        />

        <ControlledInput
          name="deviceUserId"
          control={control}
          label="Device User ID"
          type="number"
          placeholder="1887"
          errors={errors}
        />

        <div className="flex items-center gap-3">
          <Switch {...register("isActive")} />
          <Label>Is Active</Label>
        </div>

        <ControlledSelect
          name="marriedStatus"
          control={control}
          label="Marital Status"
          placeholder="Select marital status"
          options={marriedStatusOptions}
          errors={errors}
        />

        {/* Gender */}
        <ControlledSelect
          name="gender"
          control={control}
          label="Gender"
          placeholder="Select gender"
          options={genderOptions}
          errors={errors}
        />


        <ControlledSelect
          name="departmentId"
          control={control}
          label="Department"
          placeholder="Select Department"
          options={departmentOptions}
          errors={errors}
        />

        {/* Designation */}
        <ControlledSelect
          name="designationId"
          control={control}
          label="Designation"
          placeholder={
            isDesignationLoading
              ? "Loading designations..."
              : "Select Designation"
          }
          options={designationOptions}
          errors={errors}
        />
      </div>
    </div>



  );
}
