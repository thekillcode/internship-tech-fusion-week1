import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from "@/lib/api";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/authSlice";
import { toast } from "react-toastify";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { loginFormSchema } from "./schemas";




type LoginFormValues = z.infer<typeof loginFormSchema>;

export interface LoginResponse {
  access_token: string;
  user: {
    id: number | null;
    email: string;
    username: string;
    role: string;
    status: boolean;
  };
}

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on every change
    // reValidateMode: "onChange", // Re-validate on every change
  })

  const onSubmit = async (data: LoginFormValues) => {
    // Handle form submission
    try {
      const res = await Api.post<LoginResponse>(
        '/auth/login',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000
        }
      );

      // Set token cookie (secure in production)
      Cookies.set('token', res.data.access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      dispatch(setUser(res.data.user));
      toast.success("Logged in successfully", { toastId: "loginpage" });

      navigate('/')

    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'Login failed';
      toast.error(errorMessage, { toastId: "loginpage" });
    }
    finally {
      // setValue('email', '');
      setValue('password', '');
    }
    // Here you would typically call your authentication API
  };

  watch();
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {!errors.email && watch("email") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" {...register("password")} />
                {!errors.password && watch("password") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Login {isSubmitting && <LoaderCircle size={30} className="animate-spin" />}
              </Button>
              <Button type="button" variant="outline" className="w-full" >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-sm flex gap-2 justify-center">
              Don&apos;t have an account?
              <Link to={"/register"} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;