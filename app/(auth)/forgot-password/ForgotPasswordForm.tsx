"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/lib/redux/features/api/authApiSlice";
import { setUserEmail } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useAppDispatch();
  const validateForm = () => {
    let isValid = true;

    // Reset error
    setEmailError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const result = (await forgotPassword({
        email,
      }).unwrap()) as any;
      console.log(result);

      if (result?.success) {
        dispatch(setUserEmail(email));

        // Only use browser APIs when in browser environment
        if (typeof window !== "undefined") {
          toast.success("Password reset link sent successfully", {
            description: "Please check your email for the verification code",
          });

          setTimeout(() => {
            router.push("/verify-otp");
          }, 1000);
        }
      }
    } catch (error: any) {
      // Handle error if needed
      if (typeof window !== "undefined") {
        toast.error(
          (error.data.message as string) ||
            "Failed to send password reset link",
          {
            description: "Please try again later",
          },
        );
      }
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <img
            src="/bg/logo.png"
            alt="SMRT Scrub Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Forgot password
        </h1>
        <p className="text-[15px] text-gray-500 max-w-[320px] leading-relaxed">
          Enter your email for the verification proccess,we will send 4 digits
          code to your email.
        </p>
      </div>

      <div className="space-y-5 mt-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            className="h-12 rounded-lg border-gray-200 bg-gray-50/50 focus:border-purple-500 focus:ring-purple-500 placeholder:text-gray-300"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-[#7c4dff] text-white font-semibold rounded-lg text-base shadow-sm mt-4 uppercase tracking-wide cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "CONTINUE"}
        </Button>
      </div>
    </form>
  );
}
