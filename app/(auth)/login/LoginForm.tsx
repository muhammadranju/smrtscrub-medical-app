"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        {/* Logo like in image */}
        <div className="mb-2 flex justify-center">
          <img src="/bg/logo.png" alt="" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username">User Name</Label>
          <Input
            id="username"
            type="text"
            placeholder="hannah.green@test.com"
            className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password123@"
            className="h-12 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="remember" defaultChecked />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Remember me on this computer
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-base shadow-md"
        >
          LOG IN
        </Button>
      </div>
    </form>
  );
}
