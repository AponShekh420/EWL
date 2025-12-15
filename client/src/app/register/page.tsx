"use client"
import ButtonGroup from "@/components/login&resigter/ButtonGroup";
import Register from "@/components/login&resigter/Register";
import Image from "next/image";

const page = () => {

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-10">
      <div className="container">
        <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-fit w-full m-auto">
          {/* Popup box inside the border */}
          <div className="w-full h-fit bg-white rounded-2xl overflow-hidden flex flex-col">
  
           <ButtonGroup/>
  
            {/* Scrollable Register form */}
            <div className="px-8 pb-8">
             <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;