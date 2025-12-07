import { Controller, Control, FieldErrors, Path, FieldValues } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string | number;
}

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>; 
  control: Control<T>;
  label: string;
  placeholder?: string;
  options: Option[];
  errors?: FieldErrors<T>;
  id?: string;
}

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  errors,
}: ControlledSelectProps<T>) {
   const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value as string} 
          >
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

      <p className="text-sm text-red-500 min-h-5">{errorMessage || " "}</p>
    </div>
  );
}
