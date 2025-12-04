import { Controller, Control, FieldErrors,  FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Option {
label: string;
  value: string | number;
}

interface ControlledSelectProps {
  name: string;
  control: Control<FieldValues>;
  label: string;
  placeholder?: string;
  options: Option[];
  errors?: FieldErrors;
}

export function ControlledSelect({
  name,
  control,
  label,
  placeholder,
  options,
  errors,
}: ControlledSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={String(opt.value)}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <p className="text-sm text-red-500 min-h-5">
        {errors?.[name]?.message?.toString() || " "}
      </p>
    </div>
  );
}
