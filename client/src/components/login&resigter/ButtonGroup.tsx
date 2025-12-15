"use client";

import { usePathname, useRouter } from "next/navigation";



const ButtonGroup = () => {
    const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center px-8 pt-8">
      <div className="h-8 w-48 shadow-inner shadow-gray-700 rounded-full flex justify-between relative overflow-hidden">

        {/* Sliding background */}
        <div
          className={`
            bg-gradient-to-r from-teal via-purple-500 to-pink-500 
            w-1/2 h-full z-0 rounded-full absolute 
            transition-all duration-300 
            ${pathname === "/login" ? "translate-x-0" : "translate-x-full"}
          `}
        ></div>

        {/* Login button */}
        <button
          className={`
            z-10 w-1/2 font-medium flex items-center justify-center 
            transition-all duration-300
            ${pathname === "/login" ? "text-white" : "text-black"}
          `}
          onClick={() => router.push("/login")}
        >
          Login
        </button>

        {/* Register button */}
        <button
          className={`
            z-10 w-1/2 font-medium flex items-center justify-center 
            transition-all duration-300
            ${pathname === "/register" ? "text-white" : "text-black"}
          `}
          onClick={() => router.push("/register")}
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default ButtonGroup;