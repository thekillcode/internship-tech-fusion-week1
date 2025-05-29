import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from "@/lib/api";
import { toast } from "react-toastify";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { resetPasswordFormSchema } from "./schemas";


type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
export interface ResetPasswordResponse {
  message: string;
}
const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get('token');
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
      token: urlToken!
    },
    mode: "onChange", // Validate on every change
  })


  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const res = await Api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000
        }
      );

      toast.success(res.data.message, { toastId: "resetpage" });
      navigate('/')
    }
    catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'ّFailed';
      toast.error(errorMessage, { toastId: "resetpage" });
    }
    finally { }
  }
  watch()
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email to get receive reset password mail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password..."
                  {...register("password")}
                />
                {!errors.password && watch("password") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="email">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("password_confirmation")}
                />
                {!errors.password_confirmation && watch("password_confirmation") && (
                  <CheckCircle className="absolute right-3 top-2/3 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
                {errors.password_confirmation && (
                  <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Reset Password {isSubmitting && <LoaderCircle size={30} className="animate-spin" />}
              </Button>

            </div>
            <div className="mt-4 text-center text-sm">
              <Link to={"/login"} className="underline underline-offset-4">
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPassword;