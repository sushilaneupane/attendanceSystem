import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { ControlledInput } from "@/components/Form/ControlledInput";
import { ControlledSelect } from "@/components/Form/ControlledSelect";
import { useDepartments } from "@/hooks/useDepartments";
import { useDesignationsByDepartment } from "@/hooks/useDesignations";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/useEmployee";
import { employeeEditSchema, employeeSchema, EditFormValues, EmployeeFormValues } from "@/Validator/employee";
import { ImageUpload } from "@/components/EmployeeProfile/ProfileImageUpload";
import { Label } from "@radix-ui/react-label";
import { Employee } from "@/types/employee";



interface Props {
  isEditing?: boolean;
  defaultValues?: Employee | null;
  onSubmitSuccess: () => void;
}

export default function EmployeeForm({
  isEditing = false,
  defaultValues = null,
  onSubmitSuccess,
}: Props) {
  const { data: departments } = useDepartments();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EditFormValues | EmployeeFormValues>({
    resolver: zodResolver(isEditing ? employeeEditSchema : employeeSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          dateOfBirth: defaultValues.dateOfBirth?.slice(0, 10),
          dateOfJoining: defaultValues.dateOfJoining?.slice(0, 10),
        }
      : { 
          isActive: true,
          firstName: "",
          lastName: "",
          contactNumber1: "",
          dateOfBirth: "",
          dateOfJoining: "",
          deviceUserId: 0,
          gender: 1,
          marriedStatus: 2,
          departmentId: "",
          designationId: "",
          Password: "",
        },
  });

  const defaultDept = defaultValues?.departmentId;
  const selectedDept = watch("departmentId");
  const { data: designations, isLoading: isDesignationLoading } =
    useDesignationsByDepartment(selectedDept || defaultDept || "");

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();

  const [isActive, setIsActive] = useState(defaultValues?.isActive ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValues?.imageUrl) {
      const base = import.meta.env?.VITE_IMAGE_URL ?? window.location.origin;
      const filename = defaultValues.imageUrl.split(/[\\/]/).pop();
      if (filename) setPreview(`${base}/Files/${filename}`);
    }
  }, [defaultValues]);

  const departmentOptions =
    departments?.map((d) => ({ label: d.name, value: d.id })) ?? [];

  const designationOptions =
    designations?.map((d) => ({
      label: d.designationName,
      value: d.designationId,
    })) ?? [];

  const genderOptions = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
    { label: "Other", value: 3 },
  ];

  const marriedStatusOptions = [
    { label: "Married", value: 1 },
    { label: "Unmarried", value: 2 },
    { label: "Divorced", value: 3 },
    { label: "Widowed", value: 4 },
  ];

  const onSubmit = (data: EditFormValues | EmployeeFormValues) => {
    const formData = { ...data, isActive };

    const fd = new FormData();

    (Object.entries(formData) as [string, unknown][]).forEach(([key, val]) => {
      if (key !== "id" && val !== undefined && val !== null && val !== "") {
        fd.append(key, val instanceof Blob ? val : String(val));
      }
    });

    if (file) fd.append("image", file);

    if (isEditing && defaultValues?.id) {
      fd.append("id", defaultValues.id);

      updateMutation.mutate(
        { id: defaultValues.id, formData: fd },
        { onSuccess: onSubmitSuccess }
      );
    } else {
      createMutation.mutate(fd, { onSuccess: onSubmitSuccess });
    }
  };

  return (
    <form
      id="employee-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <ControlledInput
            name="deviceUserId"
            control={control}
            label="Device User ID"
            type="number"
            errors={errors}
          />

          <ControlledInput
            name="firstName"
            control={control}
            label="First Name"
            errors={errors}
          />

          <ControlledInput
            name="contactNumber1"
            control={control}
            label="Primary Contact"
            errors={errors}
          />

          <ControlledInput
            name="dateOfBirth"
            control={control}
            type="date"
            label="Date Of Birth"
            errors={errors}
          />

          <ControlledSelect
            name="gender"
            control={control}
            label="Gender"
            options={genderOptions}
            errors={errors}
          />

          <ControlledInput
            name="address"
            control={control}
            label="Address"
            errors={errors}
          />

          <ControlledSelect
            name="departmentId"
            control={control}
            label="Department"
            options={departmentOptions}
            errors={errors}
          />

          <ImageUpload
            initialPreview={preview}
            onFileSelect={(f) => setFile(f)}
          />
        </div>

        <div className="space-y-1">
          <ControlledInput
            name="email"
            control={control}
            label="Email"
            errors={errors}
          />

          <ControlledInput
            name="lastName"
            control={control}
            label="Last Name"
            errors={errors}
          />

          <ControlledInput
            name="contactNumber2"
            control={control}
            label="Secondary Contact"
            errors={errors}
          />

          <ControlledInput
            name="dateOfJoining"
            control={control}
            type="date"
            label="Date Of Joining"
            errors={errors}
          />

          <ControlledSelect
            name="marriedStatus"
            control={control}
            label="Marital Status"
            options={marriedStatusOptions}
            errors={errors}
          />

          <ControlledInput
            name="description"
            control={control}
            label="Description"
            errors={errors}
          />

          <ControlledSelect
            name="designationId"
            control={control}
            label="Designation"
            options={designationOptions}
            placeholder={
              isDesignationLoading ? "Loading..." : "Select Designation"
            }
            errors={errors}
          />

          {!isEditing && (
            <ControlledInput
              name="Password"
              control={control}
              type="password"
              label="Password"
              errors={errors}
            />
          )}

          {isEditing && (
            <div className="flex items-center gap-2 text-sm text-gray-500 min-h-2 mt-9">
              <Switch
                id="active-status"
                checked={isActive}
                onCheckedChange={setIsActive}
                className=" data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
              <Label htmlFor="active-status">
                {isActive ? "Active" : "Inactive"}  
              </Label>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}