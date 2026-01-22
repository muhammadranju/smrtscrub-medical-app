"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function VerifyOTPForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 4) {
      console.log("Verifying OTP:", code);
      router.push("/reset-password");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">
          Verification
        </h1>
        <p className="text-[15px] text-gray-500 mt-2">
          Enter your 4 digits code that you received on your email.
        </p>
      </div>

      <div className="space-y-6 mt-4">
        <div className="flex justify-center gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-2xl border-2 border-gray-400 focus:border-purple-500 focus:outline-none transition-colors rounded-xl"
            />
          ))}
        </div>

        <div className="text-center text-orange-400 font-medium">
          {formatTime(timeLeft)}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#9945FF] hover:bg-[#7c4dff] text-white font-semibold rounded-lg text-base shadow-sm uppercase tracking-wide"
        >
          CONTINUE
        </Button>

        <div className="text-center text-sm text-gray-500">
          If you didn’t receive a code!{" "}
          <button
            type="button"
            className="text-orange-400 hover:underline font-medium"
            onClick={() => setTimeLeft(30)}
          >
            Resend
          </button>
        </div>
      </div>
    </form>
  );
}
