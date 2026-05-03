import Header from "@/components/dashboard/common/header/Header";
import Sidebar from "@/components/dashboard/common/sidebar/Sidebar";
import { getSession } from "@/lib/authLib";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSession();
  if(!user) {
    return redirect("/login")
  }
  if(user?.role != "admin") {
    return redirect("/profile")
  }
  return (
    <div className="min-h-screen">
      <div className="lg:flex">
        <div className={`lg:w-64 2xl:w-72`}>
          <Sidebar />
        </div>
        <div className="lg:flex-1  mt-4 lg:mt-0">
          <Header />
          <div className="px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
