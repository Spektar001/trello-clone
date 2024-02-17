"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginView = () => {
  return (
    <div className="w-full flex items-center justify-center mt-8">
      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center gap-4 bg-white text-gray-900 py-2 px-4 shadow-md rounded-md hover:shadow-sm transition ease-in duration-200"
      >
        <Image src={"/google.png"} alt="google" width={24} height={24} />
        Login with Google
      </button>
    </div>
  );
};

export default LoginView;
