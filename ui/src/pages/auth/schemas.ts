import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerFormSchema = z.object({
  username: z.string()
    .min(6, "Username must be at least 6 characters long")
    .regex(/^[a-z0-9]+$/, "Username must be lowercase and contain no special characters")
    .transform((val) => val.toLowerCase()), // Ensure it's lowercase
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"]
});


export const forgotFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export const resetPasswordFormSchema = z.object({
  token: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"]
});