import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { Eye } from "lucide-react";
import { useRegisterTenants } from "../../../hooks/useTenants";
import { ControlledInput } from "../../../components/Form/ControlledInput";

const tenantRegisterSchema = z.object({
  name: z.string().min(3, "Company name must be at least 3 characters"),
  server: z.string().min(1, "Server is required"),
  database: z.string().min(1, "Database is required"),
  useWindowsAuth: z.boolean(),
  userId: z.string().optional(),
  password: z.string().optional(),
  frontendUrl: z
    .string()
    .min(3, "Frontend subdomain is required")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
});

type TenantRegisterForm = z.infer<typeof tenantRegisterSchema>;

export default function TenantSignUp() {
  const navigate = useNavigate();
  const { registerTenantMutation } = useRegisterTenants();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TenantRegisterForm>({
    resolver: zodResolver(tenantRegisterSchema),
    defaultValues: { useWindowsAuth: false },
  });

  const useWindowsAuth = watch("useWindowsAuth");
  const isLoading = registerTenantMutation.isPending || isSubmitting;

  const onSubmit = (data: TenantRegisterForm) => {
    const payload = {
      name: data.name,
      server: data.server,
      database: data.database,
      userId: data.useWindowsAuth ? null : data.userId ?? null,
      password: data.useWindowsAuth ? null : data.password ?? null,
      useWindowsAuth: data.useWindowsAuth,
      frontendUrl: data.frontendUrl,
    };

    registerTenantMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Company registered successfully!");
        navigate("/");
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || error?.message || "Tenant registration failed";
        toast.error(message);
      },
    });
  };

  return (
    <>

      <div className="text-center">
    <h2 className="text-2xl font-bold text-red-500">Register Your Company</h2>
    <p className="text-gray-600 ">Fill in the details to create your tenant account</p>
  </div>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-md mx-auto p-4">
      <ControlledInput name="name" control={control} label="Company Name" placeholder="Enter company name" errors={errors} />
      <ControlledInput name="server" control={control} label="Server" placeholder="Enter server" errors={errors} />
      <ControlledInput name="database" control={control} label="Database" placeholder="Enter database" errors={errors} />

      {/* Windows Auth Checkbox */}
      <div className="flex items-center gap-1 md:col-span-2">
        <Controller
          name="useWindowsAuth"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              id="useWindowsAuth"
              className="mr-2"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <label htmlFor="useWindowsAuth" className="cursor-pointer">
          Use Windows Authentication
        </label>
      </div>

      {/* Conditional User ID & Password */}
      {!useWindowsAuth && (
        <>
          <ControlledInput name="userId" control={control} label="User ID" placeholder="Enter user ID" errors={errors} />
          
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="pr-10 border rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Eye size={20} />
                  </button>
                </div>
              )}
            />
            <p className="text-sm text-red-500 min-h-5">{errors?.password?.message?.toString() || " "}</p>
          </div>
        </>
      )}

      <ControlledInput
        name="frontendUrl"
        control={control}
        label="Frontend Subdomain"
        placeholder="your-company (for subdomain)"
        errors={errors}
      />

      <div className="md:col-span-2">
        <Button type="submit" className="w-full text-white bg-black hover:bg-gray-900" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register Company"}
        </Button>
      </div>

      <div className="md:col-span-2 text-center mt-2">
        <p className="text-sm text-gray-600">
          Already have a tenant account?{" "}
          <button type="button" onClick={() => navigate("/tenant-login")} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </button>
        </p>
      </div>
    </form>
    </>
  );
}
