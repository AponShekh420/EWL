import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const MobileMenu = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`
        fixed inset-0 z-50 bg-black/50 flex transition-opacity duration-300
        ${toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setToggle(false)}
    >
      {/* LEFT SLIDE MENU */}
      <div
        className={`
          sm:min-w-80 min-w-72 bg-white h-full p-4 transition-transform duration-300
          ${toggle ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
      >
        <div className="w-full flex justify-end">
          <Icon
            icon="maki:cross"
            width="28"
            height="28"
            className="cursor-pointer text-[#0F75BC] hover:text-[#270034] duration-150"
            onClick={() => setToggle(false)}
          />
        </div>

        {/* LOGO */}
        <div className="sm:min-w-[130px] sm:max-w-[130px] min-w-[110px] max-w-[110px] sm:h-16 h-14 relative mx-auto -mt-5">
          <Image src="/logo.png" alt="logo" fill className="h-full w-auto" />
        </div>

        {/* LINKS */}
        <div className="flex flex-col border-t-2 sm:mt-3 mt-4 border-[#0F75BC] ">
          <Link href="/" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Home
          </Link>
          <Link href="/about" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            About
          </Link>
          <Link href="/services" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Services
          </Link>
          <Link href="/courses" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Courses
          </Link>
          <Link href="/shop" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Shop
          </Link>
          <Link href="/speakers" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Speakers
          </Link>
          <Link href="/volunteer" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Volunteer
          </Link>
          <Link href="/blogs" className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b" onClick={() => setToggle(false)}>
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
