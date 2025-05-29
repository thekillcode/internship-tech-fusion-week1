import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerFormSchema } from "./schemas";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { Api } from "@/lib/api";
import Cookies from "js-cookie";
import { setUser } from "@/store/authSlice";
import { toast } from "react-toastify";


type RegisterFormValues = z.infer<typeof registerFormSchema>;

export interface RegisterResponse {
  access_token: string;
  user: {
    id: number | null;
    email: string;
    username: string;
    role: string;
    status: boolean;
  };
}
const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange", // Validate on every change
    reValidateMode: "onChange", // Re-validate on every change
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await Api.post<RegisterResponse>(
        '/auth/register',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      Cookies.set('token', res.data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      dispatch(setUser(res.data.user));
      toast.success("Logged in successfully", { toastId: "registerpage" });
      navigate('/')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Login failed';
      toast.error(errorMessage, { toastId: "registerpage" });
    }
  }
  watch();
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Fill your Form to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="john"
                  {...register('username')}
                  autoComplete="username"
                />
                {!errors.username && watch("username") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  autoComplete="username"
                />
                {!errors.email && watch("email") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>

                <Input id="password" type="password" required autoComplete="new-password" {...register('password')} />
                {!errors.password && watch("password") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Confirm Password</Label>

                <Input id="password_confirmation" type="password" required autoComplete="new-password" {...register('password_confirmation')} />
                {!errors.password_confirmation && watch("password_confirmation") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.password_confirmation && (
                  <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Register {isSubmitting && <LoaderCircle size={30} className="animate-spin" />}

              </Button>
            </div>
            <div className="mt-4 text-sm flex gap-2 justify-center">
              Already have an account?
              <Link to={"/login"} className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;