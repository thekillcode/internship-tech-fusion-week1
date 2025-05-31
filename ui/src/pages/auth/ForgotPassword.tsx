import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Api } from "@/lib/api";
import { toast } from "react-toastify";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { forgotFormSchema } from "./schemas";
import { useState } from "react";


type ForgotFormValues = z.infer<typeof forgotFormSchema>;
export interface ForgotResponse {
  message: string;
}
const ForgotPassword = () => {
  const [status, setStatus] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange", // Validate on every change
    reValidateMode: "onChange", // Re-validate on every change
  })


  const onSubmit = async (data: ForgotFormValues) => {
    try {
      const res = await Api.post<ForgotResponse>(
        '/auth/forgot-password',
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000
        }
      );

      setStatus(res.data.message)
      toast.success(res.data.message, { toastId: "forgotpage" });
    }
    catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 'ّFailed';
      toast.error(errorMessage, { toastId: "forgotpage" });
    }
    finally { }
  }
  watch()
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to get receive reset password mail
            {status !== null && (
              <Card className="py-2 bg-green-500/20 mt-4">
                <CardContent className="font-medium tracking-wider">
                  {status}
                </CardContent>
              </Card>
            )}

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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Sent Reset Password Link! {isSubmitting && <LoaderCircle size={30} className="animate-spin" />}
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

export default ForgotPassword;