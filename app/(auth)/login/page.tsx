import { LoginForm } from "./LoginForm";
import Image from "next/image"; // if using Next.js — otherwise use <img />

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side - Illustration + colorful abstract bg (like your screenshot) */}
      <div className="relative hidden lg:block bg-linear-gradient-to-br from-gray-50 via-blue-50 to-purple-50/30 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          {/* Wavy lines */}
          <div className="absolute -left-20 top-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute right-10 bottom-10 w-80 h-80 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute left-1/3 top-1/2 w-64 h-64 bg-purple-300 rounded-full blur-3xl"></div>

          {/* Small decorative dots/circles */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-orange-500 rounded-full"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500 rounded-full"></div>
          <div className="absolute bottom-40 left-1/2 w-5 h-5 bg-cyan-500 rounded-full"></div>
        </div>

        {/* Main illustration — replace src with your actual woman+laptop+coffee illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <Image
            src="/bg/login.svg" // ← Put your SVG/PNG here (or use a placeholder like https://illustrations.dev/ or draw your own)
            alt="Woman working on laptop with coffee"
            width={800}
            height={600}
            className="object-contain drop-shadow-2xl max-w-[90%] max-h-[90%]"
            priority
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center p-6 md:p-10 lg:p-16">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
