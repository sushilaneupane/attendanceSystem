import { Controller, Control, FieldErrors, FieldValues, Path, get } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ControlledInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string;
  errors?: FieldErrors<T>;
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  errors,
}: ControlledInputProps<T>) {
  const errorMessage = get(errors, name)?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...field} type={type} placeholder={placeholder} />
        )}
      />

      <p className="text-sm text-red-500 min-h-2">
        {errorMessage || " "}
      </p>
    </div>
  );
}
