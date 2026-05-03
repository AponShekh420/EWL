"use client";
import { logout } from "@/redux/auth/userSlice";
import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const router = useRouter();
  const logoutFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        dispatch(logout());
        toast.success(data?.message);
        router.push("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  return (
    <div>
      <button
        onClick={logoutFunc}
        className="flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white w-full"
      >
        <Icon icon="material-symbols:logout" width="24" height="24" /> logout
      </button>
    </div>
  );
}
