import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";

import { Eye } from "lucide-react";
import { useRegisterTenants } from "../../../hooks/useTenants";

// Zod schema
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
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TenantRegisterForm>({
    resolver: zodResolver(tenantRegisterSchema),
    defaultValues: { useWindowsAuth: false },
  });

  const useWindowsAuth = watch("useWindowsAuth");

  // Use isPending for React Query v5
  const isLoading = registerTenantMutation.isPending || isSubmitting;

  const onSubmit = (data: TenantRegisterForm) => {
    console.log("✅ onSubmit fired!");
    console.log("Form data:", data);

    const payload = {
      name: data.name,
      server: data.server,
      database: data.database,
      userId: data.useWindowsAuth ? null : data.userId ?? null,
      password: data.useWindowsAuth ? null : data.password ?? null,
      useWindowsAuth: data.useWindowsAuth,
      frontendUrl: data.frontendUrl,
    };
    
    console.log("Submitting payload:", payload);

    registerTenantMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Company registered successfully!");
        navigate("/");
      },
      onError: (error: unknown) => {
  console.log("Full error object:", error);
  console.log("Error response:", (error as any)?.response);
  console.log("Error data:", (error as any)?.response?.data);

  // navigate("/");
  
  const message =
    (error as any)?.response?.data?.message || 
    (error as any)?.message || 
    "Tenant registration failed";
  
  toast.error(message);
},
    });
    
  };

  return (
    
      <Card className="w-full max-w-md rounded-lg border-none -mt-13">
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
            <div className="flex flex-col gap-1 md:col-span-2">
              <Label className="mb-1">Company Name</Label>
              <Input placeholder="Enter company name" {...register("name")} />
              <p className="text-sm text-red-500 min-h-5">{errors.name?.message || " "}</p>
            </div>

            {/* Server */}
            <div className="flex flex-col gap-1">
              <Label>Server</Label>
              <Input placeholder="Enter server" {...register("server")} />
              <p className="text-sm text-red-500 min-h-5">{errors.server?.message || " "}</p>
            </div>

            {/* Database */}
            <div className="flex flex-col gap-1">
              <Label>Database</Label>
              <Input placeholder="Enter database" {...register("database")} />
              <p className="text-sm text-red-500 min-h-5">{errors.database?.message || " "}</p>
            </div>

            {/* Windows Auth Checkbox */}
            <div className="flex items-center gap-1 md:col-span-2">
              <input 
                type="checkbox" 
                id="useWindowsAuth"
                {...register("useWindowsAuth")} 
                className="mr-2" 
              />
              <Label htmlFor="useWindowsAuth" className="cursor-pointer">
                Use Windows Authentication
              </Label>
            </div>

            {/* Conditional UserId & Password */}
            {!useWindowsAuth && (
              <>
                <div className="flex flex-col gap-1">
                  <Label>User ID</Label>
                  <Input placeholder="Enter user ID" {...register("userId")} />
                  <p className="text-sm text-red-500 min-h-5">{errors.userId?.message || " "}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="pr-10"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                  <p className="text-sm text-red-500 min-h-5">{errors.password?.message || " "}</p>
                </div>
              </>
            )}

            {/* Frontend Subdomain */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <Label>Frontend Subdomain</Label>
              <Input placeholder="your-company (for subdomain)" {...register("frontendUrl")} />
              <p className="text-sm text-red-500 min-h-5">{errors.frontendUrl?.message || " "}</p>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full text-white bg-black hover:bg-gray-900"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register Company"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have a tenant account?{" "}
            <button
              type="button"
              onClick={() => navigate("/tenant-login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </button>
          </p>
        </CardFooter>
      </Card>
   
  );
}