import Login from "@/components/common/Login";
import ButtonGroup from "@/components/login&resigter/ButtonGroup";
import { getSession } from "@/lib/authLib";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async () => {
  const userInfo = await getSession();

  if (userInfo) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    userInfo.role === "admin" ? redirect("/dashboard") : redirect("/profile");
    return null;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container md:flex md:justify-between md:items-center gap-x-5">
        <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-fit lg:w-1/3 md:w-2/4 w-full">
          {/* Popup box inside the border */}
          <div className="w-full h-fit bg-white rounded-2xl overflow-hidden flex flex-col">
  
           <ButtonGroup/>
  
            {/* Scrollable Register form */}
            <div className="max-h-[75vh] overflow-y-auto px-8 pb-8">
             <Login/>
            </div>
          </div>
        </div>

        <div
          className="lg:w-2/3 md:w-2/4 w-full aspect-[4/3] relative bg-[#0F75BC] overflow-hidden md:block hidden"
        >
          <Image 
            src="/images/login.jpg" 
            alt="Login" 
            fill 
            className="w-full h-full absolute"
          />
        </div>
      </div>
    </div>
  );
}

export default page;