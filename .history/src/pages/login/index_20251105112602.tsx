import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Input} from "../../components/ui/input";
import {Button} from "../../components/ui/button"; 
import { Label";
import { useAuth } from "../../context/AuthContext";
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

// Schema definition using Zod
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

// Type for form data inferred from Zod schema
type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();
  const { login } = useUser();
  const { mutate: loginUser, isLoading: isPending } = login;

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
      username: data.username,
      password: data.password,
    };

    loginUser(payload, {
      onSuccess: (response: any) => {
        const token = response?.data?.token;
        const user = response?.data?.userDto;
        if (token && user) {
          localStorage.setItem("authToken", token);
          loginContext(token, user);
          toast.success("Logged in successfully!");
          navigate("/dashboard");
        }
      },
      onError: (error: any) => {
        const errorData = error?.response?.data?.errorMessage || "";
        console.log("Login error data:", errorData);
        if (errorData) {
          toast.error(errorData);
        } else {
          toast.error("Invalid username or password.");
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg border-0 bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to sign in</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
              <Label>Username</Label>
              <Input
                placeholder="Enter your username"
                className="mt-1 border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-500"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="flex flex-col relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 pr-10 border border-gray-500 focus:border-transparent focus:outline-none focus:ring-0 hover:border-gray-500"
                {...register("password")}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Eye size={20} />
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <a href="#" className="text-sm text-blue-600 hover:underline ml-auto">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
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
