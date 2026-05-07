import { getUserById } from "@/actions/user";
import SidebarLinks from "@/components/profile/SidebarLinks";
import InstructorProfile from "@/components/speaker-profile/InstructorProfile";
import { getSession } from "@/lib/authLib";

import Link from "next/link";
import React from "react";
export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const { data: user } = await getUserById(session?.id as string);
  const speaker = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    courses: user.courses,
    userName: user.userName,
  };
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative h-[300px] w-full overflow-hidden bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center">
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-24 px-6">
          <h1 className="text-5xl font-serif font-bold text-white mb-2">
            My Profile
          </h1>
          <nav className="text-blue-100 flex gap-2 text-sm uppercase tracking-widest">
            <Link href="/">Home</Link> / <Link href={"/profile"}>user</Link> /{" "}
            <span className="text-white font-bold">
              {user.firstName} {user.lastName}
            </span>
          </nav>
        </div>
      </section>
      <InstructorProfile speaker={speaker} />
      <div className="container mt-8 grid md:grid-cols-[1fr_3fr] gap-x-8">
        <SidebarLinks />
        <div className="mt-8 md:mt-0 overflow-x-auto">{children}</div>
      </div>
    </main>
  );
}
