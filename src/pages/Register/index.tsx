import { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Eye } from "lucide-react";

const schema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

type RegisterFormInputs = z.infer<typeof schema>;
type BackendErrors = {
  [key: string]: string[];
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useUser();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [backendErrors] = useState<BackendErrors>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    const payload = {
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      email: data.email || undefined,
      username: data.username || undefined,
      password: data.password || undefined,
      confirmPassword: data.confirmPassword || undefined,
      role: "USER",
    };

    registerUser.mutate(payload, {
  onError: (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message ?? "Something went wrong!");
    return;
  }

  // Fallback for non-Axios errors
  const message =
    error instanceof Error ? error.message : "Unexpected error occurred";
  toast.error(message);
},
      onSuccess: () => {
        toast.success("Account created successfully!");
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg border-0 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Fill in the details to register</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name */}
            <div className="flex flex-col">
              <Label className="mb-1">First Name</Label>
              <Input
                {...register("firstName")}
                className="border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-00"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              {backendErrors.FirstName && <p className="text-red-500 text-sm">{backendErrors.FirstName[0]}</p>}
            </div>

            <div className="flex flex-col">
              <Label className="mb-1">Last Name</Label>
              <Input
                {...register("lastName")}
                className="border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-300"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              {backendErrors.LastName && <p className="text-red-500 text-sm">{backendErrors.LastName[0]}</p>}
            </div>
            <div className="flex flex-col">
              <Label className="mb-1">Email</Label>
              <Input
                {...register("email")}
                className="border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-300"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              {backendErrors.Email && <p className="text-red-500 text-sm">{backendErrors.Email[0]}</p>}
            </div>

            <div className="flex flex-col relative">
              <Label className="mb-1">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="pr-10 border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-300"
              />
              <Eye
                size={20}
                className="absolute right-3 top-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              {backendErrors.Password && <p className="text-red-500 text-sm">{backendErrors.Password[0]}</p>}
            </div>

            <div className="flex flex-col relative">
              <Label className="mb-1">Confirm Password</Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="pr-10 border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-300"
              />
              <Eye
                size={20}
                className="absolute right-3 top-8 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              {backendErrors.ConfirmPassword && <p className="text-red-500 text-sm">{backendErrors.ConfirmPassword[0]}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
              disabled={registerUser.isPending}
            >
              {registerUser.isPending ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline ml-1"
            >
              Login
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
