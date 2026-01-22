"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function BackLoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="fixed flex items-center top-4 left-4 z-50 bg-white text-black py-1 px-4 rounded-full shadow-lg hover:bg-gray-100 cursor-pointer hover:border-b-2 hover:border-gray-900  transition-all"
    >
      <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back
    </button>
  );
}

export default BackLoginButton;
