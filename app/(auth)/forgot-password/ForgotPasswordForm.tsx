"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send OTP would go here
    console.log("Sending OTP to:", email);
    router.push("/verify-otp");
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
            E mail
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
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-[#7c4dff] text-white font-semibold rounded-lg text-base shadow-sm mt-4 uppercase tracking-wide"
        >
          CONTINUE
        </Button>
      </div>
    </form>
  );
}
