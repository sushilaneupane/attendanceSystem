import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";

import { useUser } from "../../hooks/useUser";
import { useAuth } from "@/lib/auth-context-utils";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); 
  const { login } = useUser();
  const { mutate: loginUser, isPending } = login;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const payload = {
      UserName: data.username,
      Password: data.password,
    };

    loginUser(payload, {
      onSuccess: (response) => {
        const token = response?.data?.token;
        const user = response?.data?.userDto;
        const role = response?.data?.role?.[0];

        if (token && user) {
          localStorage.setItem("authToken", token);
          loginContext(token, user);
          toast.success("Logged in successfully!");

          switch (role) {
            case "Admin":
              navigate("/tenant-dashboard");
              break;
            case "SuperAdmin":
              navigate("/home");
              break;
            default:
              toast.error("Unauthorized role. Redirecting to login.");
              navigate("/login");
          }
        } else {
          toast.error("Invalid response from server.");
        }
      },
      onError: (err) => {
        const error = err as AxiosError;
        const status = error?.response?.status;
        if (status === 401) {
          toast.error("Invalid username or password.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 sm:py-12">
      <Card className="w-full max-w-md sm:max-w-lg lg:max-w-md shadow-lg rounded-lg border-0 bg-white">
        <CardHeader className="text-center px-6 pt-6 sm:pt-8">
          <CardTitle className="text-2xl sm:text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 sm:px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <Label htmlFor="username" className="text-sm sm:text-base">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                className="mt-1 border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-500 text-sm sm:text-base"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="relative">
             <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                id="password"
                className="mt-1 pr-10 border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-500 text-sm sm:text-base"
                {...register("password")}
              />
              <span
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer mt-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <div className="flex items-center">
              <a
                href="#"
                className="text-xs sm:text-sm text-blue-600 hover:underline ml-auto"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-800 text-white hover:bg-blue-700 py-2 sm:py-3 text-sm sm:text-base "
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center px-6 pb-6 sm:pb-8">
          <p className="text-xs sm:text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
