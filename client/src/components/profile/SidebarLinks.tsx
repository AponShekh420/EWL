"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
export default function SidebarLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col border h-fit!">
      <Link
        className={`flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white border-b ${pathname === "/profile" ? "bg-teal text-white" : ""}`}
        href="/profile"
      >
        <Icon icon="gg:profile" width="24" height="24" /> profile
      </Link>
      <Link
        className={`flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white border-b ${pathname.includes("my-courses") ? "bg-teal text-white" : ""}`}
        href="/profile/my-courses"
      >
        <Icon icon="mage:book" width="24" height="24" /> my courses
      </Link>
      <Link
        className={`flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white border-b ${pathname.includes("my-classes") ? "bg-teal text-white" : ""}`}
        href="/profile/my-classes"
      >
        <Icon icon="ic:outline-class" width="24" height="24" /> my classes
      </Link>
      <Link
        className={`flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white border-b ${pathname.includes("my-orders") ? "bg-teal text-white" : ""}`}
        href="/profile/my-orders"
      >
        <Icon icon="iconoir:cart" width="23" height="23" /> my orders
      </Link>
      <Link
        className={`flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white border-b ${pathname.includes("infoline") ? "bg-teal text-white" : ""}`}
        href="/profile/infoline"
      >
        <Icon icon="ri:folder-info-line" width="24" height="24" /> infoline
      </Link>
      <Link
        className={`flex gap-2 items-center capitalize py-4 hover:bg-teal px-4 hover:text-white border-b ${pathname.includes("wishlist") ? "bg-teal text-white" : ""}`}
        href="/profile/wishlist"
      >
        <Icon icon="solar:heart-linear" width="24" height="24" /> wishlist
      </Link>

      <LogoutButton />
    </div>
  );
}
