"use client";
import "@/app/home.css";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import LoginRegister from "./LoginRegister";
const Nav = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [authToggle, setAuthToggle] = useState<boolean | string>(false);
  return (
    <div className="header">
      {/* top header */}
      <nav className="bg-[#0F75BC] w-full h-7 fixed top-0 z-40">
        <div className="container flex justify-end h-full">
          <div className="flex items-center gap-x-3">
            <div className="flex gap-x-2 h-full items-center">
              <p 
                className="text-sm capitalize text-white hover:text-[#270034] cursor-pointer transition-all duration-150"
                onClick={() => setAuthToggle("login")}
              >login</p>
              <div className="h-full border-[1px] border-white bg-white"></div>
              <p 
                className="text-sm capitalize text-white hover:text-[#270034] cursor-pointer transition-all duration-150"
                onClick={() => setAuthToggle("register")}
              >register</p>
            </div>
            <div className="h-full border-[1px] border-white bg-white"></div>
            <div className="relative w-7">
              <p className="bg-[#270034] rounded-full text-[10px] text-white h-fit flex items-center justify-center w-fit px-[3px] absolute top-0 -left-1 font-medium">2</p>
              <Icon icon="uil:cart" width="23" height="23" className="text-sm capitalize text-white hover:text-[#270034] cursor-pointer transition-all duration-150"/>
            </div>
          </div>
        </div>
      </nav>

      {/* desktop header & menu */}
      <nav className="text-[1.05rem] fixed top-7 z-40 w-full bg-white h-20 shadow-[0px_0px_15px_0px_#C5C5C5]">
        <div className="container flex justify-between items-center h-full sm:gap-x-2 py-2">
          {/* logo */}
          <div className="sm:min-w-[130px] w-[130px] sm:max-w-[130px] h-full relative">
            <Image src="/logo.png" alt="logo" fill className="h-full w-auto" />
          </div>

          {/* menu */}
          <div className="lg:flex flex-wrap hidden">
            <Link
              href={"/"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              About
            </Link>
            <Link
              href={"/services"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Services
            </Link>
            <Link
              href={"/courses"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Courses
            </Link>
            <Link
              href={"/shop"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Shop
            </Link>
            <Link
              href={"/speakers"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Speakers
            </Link>
            <Link
              href={"/volunteer"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Get Involved
            </Link>
            <Link
              href={"/blogs"}
              className="px-2.5 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150"
            >
              Blog
            </Link>
          </div>

          {/* buttons */}
          <div className="flex items-center gap-x-2">
            <button className="bg-[#0F75BC] px-5 py-2 h-9 rounded-full font-semibold text-white text-[0.9rem] text-nowrap shadow-[2px_2px_20px_0px_#2700346c] hover:bg-[#270034] transition-all duration-150">
              Free demo
            </button>
            <div className="w-[45px] flex items-center justify-center lg:hidden">
              <Icon
                icon="ei:navicon"
                width="45"
                height="45"
                className="cursor-pointer hover:text-[#0F75BC] duration-150 transition-all"
                onClick={() => setToggle(true)}
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="h-24 mb-3"></div>
      {/* destop header & menu end */}

      {/* mobile menu */}
      <MobileMenu setToggle={setToggle} toggle={toggle} />

      {/* login & register form */}
      {authToggle && <LoginRegister setAuthToggle={setAuthToggle} authToggle={authToggle}/>}
    </div>
  );
};

export default Nav;
