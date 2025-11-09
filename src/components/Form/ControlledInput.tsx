import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ControlledInputProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
  type?: string;
  errors?: FieldErrors;
}

export function ControlledInput({
  name,
  control,
  label,
  placeholder,
  type = "text",
  errors,
}: ControlledInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} type={type} placeholder={placeholder} />}
      />
      <p className="text-sm text-red-500 min-h-5">
        {errors?.[name]?.message?.toString() || " "}
      </p>
    </div>
  );
}
