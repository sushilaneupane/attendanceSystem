import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";

import { Eye } from "lucide-react";
import { useTenants } from "../../hooks/useTenants";

// Zod schema
const tenantRegisterSchema = z.object({
  name: z.string().min(3, "Company name must be at least 3 characters"),
  server: z.string().min(1, "Server is required"),
  database: z.string().min(1, "Database is required"),
  useWindowsAuth: z.boolean(),
  userId: z.string().min(1, "User ID is required").optional(),
  password: z.string().optional(),
  frontendUrl: z
    .string()
    .min(3, "Frontend subdomain is required")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
});

type TenantRegisterForm = z.infer<typeof tenantRegisterSchema>;

export default function TenantSignUp() {
  const navigate = useNavigate();
  const { registerTenantMutation } = useTenants();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TenantRegisterForm>({
    resolver: zodResolver(tenantRegisterSchema),
    defaultValues: { useWindowsAuth: false },
  });

  const useWindowsAuth = watch("useWindowsAuth");


  const isLoading = registerTenantMutation.status === "pending";

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
        navigate("/tenant-login");
      },
      onError: (error: unknown) => {
        const message =
          (error as any)?.response?.data?.message || "Tenant registration failed";
        toast.error(message);
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <Card className="w-full max-w-md rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-500">Register Your Company</CardTitle>
          <CardDescription>Fill in the details to create your tenant account</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* Company Name */}
            <div className="flex flex-col gap-2">
              <Label className="mb-1 mr-20">Company Name</Label>
              <Input placeholder="Enter company name" {...register("name")} />
              <p className="text-sm text-red-500 min-h-5">{errors.name?.message || " "}</p>
            </div>

            {/* Server */}
            <div className="flex flex-col gap-2">
              <Label>Server</Label>
              <Input placeholder="Enter server" {...register("server")} />
              <p className="text-sm text-red-500 min-h-5">{errors.server?.message || " "}</p>
            </div>

            {/* Database */}
            <div className="flex flex-col gap-2">
              <Label>Database</Label>
              <Input placeholder="Enter database" {...register("database")} />
              <p className="text-sm text-red-500 min-h-5">{errors.database?.message || " "}</p>
            </div>

            {/* Windows Auth Checkbox */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>
                <input type="checkbox" {...register("useWindowsAuth")} className="mr-2" />
                Use Windows Authentication
              </Label>
            </div>

            {/* Conditional UserId & Password */}
            {!useWindowsAuth && (
              <>
                <div className="flex flex-col gap-2">
                  <Label>User Id</Label>
                  <Input placeholder="Enter user id" {...register("userId")} />
                  <p className="text-sm text-red-500 min-h-5">{errors.userId?.message || " "}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="pr-10"
                      {...register("password")}
                    />
                    <span
                      className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye size={20} />
                    </span>
                  </div>
                  <p className="text-sm text-red-500 min-h-5">{errors.password?.message || " "}</p>
                </div>
              </>
            )}

            {/* Frontend Subdomain */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>Frontend Subdomain</Label>
              <Input placeholder="your-company (for subdomain)" {...register("frontendUrl")} />
              <p className="text-sm text-red-500 min-h-5">{errors.frontendUrl?.message || " "}</p>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full text-white bg-black cursor-pointer hover:bg-gray-900"
                disabled={isLoading} // ✅ React Query v5 loading
              >
                {isLoading ? "Registering..." : "Register Company"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have a tenant account?{" "}
            <span
              onClick={() => navigate("/tenant-login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
