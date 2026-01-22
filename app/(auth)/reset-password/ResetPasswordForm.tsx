"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update password
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in duration-300",
          className,
        )}
      >
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 relative">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-4 border-blue-100">
            <Check className="w-10 h-10 text-[#1e293b]" strokeWidth={4} />
          </div>
        </div>

        <h1 className="text-3xl font-normal text-[#1e293b]">Successfully</h1>
        <p className="text-[15px] text-gray-500">
          Your password has been reset successfully
        </p>

        <Button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full h-12 bg-purple-600 hover:bg-[#7c4dff] text-white font-semibold rounded-lg text-base shadow-sm mt-4 uppercase tracking-wide"
        >
          CONTINUE
        </Button>
      </div>
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        {/* Logo */}
        <div className="mb-2 flex justify-center">
          {/* Use a different logo or same based on design. Reset design had a shield icon. */}
          <img
            src="/bg/logo.png"
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
          {/* If you have the shield icon from screenshot, use it. For now, reusing logo or placeholder if needed. 
                 The screenshot shows a shield with "ELITE CHAUFFEUR". 
                 I'll stick to the app logo for consistency unless user provided that specific asset. 
             */}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">
          New Password
        </h1>
        <p className="text-[15px] text-gray-500 max-w-[320px] leading-relaxed">
          Set the new password for your account so you can login and access all
          features.
        </p>
      </div>

      <div className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label htmlFor="password">Enter new password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="h-12 rounded-lg border-gray-300 pr-10 focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="47Password"
              className="h-12 rounded-lg border-gray-300 pr-10 focus:border-purple-500 focus:ring-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-[#7c4dff] text-white font-semibold rounded-lg text-base shadow-sm mt-4 uppercase tracking-wide"
        >
          UPDATE PASSWORD
        </Button>
      </div>
    </form>
  );
}
