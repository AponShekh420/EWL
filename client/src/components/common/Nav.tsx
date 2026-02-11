/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "@/app/home.css";
import { logout } from "@/redux/auth/userSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { CartType } from "@/types/Cart";
import { BASE_URL } from "@/utils/envVariable";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "./cart/CardModal";
import LoginRegister from "./LoginRegister";
import MobileMenu from "./MobileMenu";

const Nav = ({ cart }: { cart: CartType }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [authToggle, setAuthToggle] = useState<boolean | string>(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);
  const { userInfo, loading } = useSelector((state: RootState) => state?.user);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.includes("dashboard")) {
    return null;
  }

  const logoutFunc = async (e: React.MouseEvent<HTMLParagraphElement>) => {
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
    <header className="header !max-w-screen">
      {/* top header */}
      <nav className="bg-[#0F75BC] w-full h-7 fixed top-0 z-50 !max-w-screen">
        <div className="container flex justify-end h-full">
          <div className="flex items-center gap-x-3">
            {!userInfo ? (
              <div
                className={`flex gap-x-2 h-full items-center ${loading ? "pointer-events-none opacity-50" : ""}`}
              >
                <p
                  className="text-sm capitalize text-white hover:text-[#270034] cursor-pointer transition-all duration-150"
                  onClick={() => !loading && setAuthToggle("login")}
                >
                  login
                </p>
                <div className="h-full border-[1px] border-white bg-white"></div>
                <p
                  className="text-sm capitalize text-white hover:text-[#270034] cursor-pointer transition-all duration-150"
                  onClick={() => !loading && setAuthToggle("register")}
                >
                  register
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-[15px] !z-50">
                <div
                  className="flex items-center gap-[7px] cursor-pointer relative"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                >
                  <div className="relative">
                    <Image
                      width={25}
                      height={25}
                      src={
                        `/images/${(userInfo as any)?.avatar}` ||
                        "/images/avatar.png"
                      }
                      alt="avatar"
                      className="w-[22px] h-[22px] rounded-full object-cover"
                    />
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                  </div>

                  {/* <h1 className="text-[1rem] font-[400] text-white sm:block hidden">Chaya</h1> */}
                  <h1 className="text-[0.9rem] font-[400] text-white">
                    {(userInfo as any)?.firstName}
                  </h1>

                  <div
                    className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} !z-50 bg-white w-max rounded-md absolute dark:bg-slate-800 top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                  >
                    <Link
                      href={
                        (userInfo as any)?.role == "admin"
                          ? "/dashboard/profile"
                          : "/profile"
                      }
                      className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50"
                    >
                      <Icon icon="tabler:user" width="24" height="24" />
                      View Profile
                    </Link>
                    <Link
                      href={"/settings"}
                      className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50"
                    >
                      <Icon
                        icon="weui:setting-outlined"
                        width="24"
                        height="24"
                      />
                      Settings
                    </Link>
                    <Link
                      href={"/dashboard"}
                      className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50"
                    >
                      <Icon icon="duo-icons:dashboard" width="24" height="24" />
                      Dashboard
                    </Link>

                    <div className="mt-3 border-t dark:border-slate-700 border-gray-200 pt-[5px]">
                      <p
                        className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50"
                        onClick={logoutFunc}
                      >
                        <Icon icon="tabler:logout-2" width="24" height="24" />
                        Logout
                      </p>
                    </div>
                  </div>
                  <Icon
                    icon="iconamoon:arrow-down-2"
                    width="23"
                    height="23"
                    className={`${accountMenuOpen ? "rotate-0" : "rotate-[180deg]"} transition-all duration-300 text-white`}
                  />
                </div>
              </div>
            )}

            {/* devider */}
            <div className="h-full border-[1px] border-white bg-white"></div>

            {/* cart icon */}
            <div className="relative w-7">
              <p className="bg-[#270034] rounded-full text-[10px] text-white h-fit flex items-center justify-center w-fit px-[3px] absolute top-0 -left-1 font-medium">
                {cart.totalProduct}
              </p>
              <Icon
                onClick={() => dispatch(addToCart({ isCartModalShow: true }))}
                icon="uil:cart"
                width="23"
                height="23"
                className="text-sm capitalize text-white hover:text-[#270034] cursor-pointer transition-all duration-150"
              />
              <CartModal cart={cart} />
            </div>
          </div>
        </div>
      </nav>

      {/* desktop header & menu */}
      <nav className="text-[1.05rem] fixed top-7 z-40 w-full bg-white h-20 shadow-[0px_0px_15px_0px_#C5C5C5] !max-w-screen">
        <div className="container flex justify-between items-center h-full sm:gap-x-2 py-2">
          {/* logo */}
          <Link
            className="sm:min-w-[130px] w-[130px] sm:max-w-[130px] h-full relative"
            href={"/"}
          >
            <Image src="/logo.png" alt="logo" fill className="h-full w-auto" />
          </Link>

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
              Donate
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
      {authToggle && (
        <LoginRegister setAuthToggle={setAuthToggle} authToggle={authToggle} />
      )}
    </header>
  );
};

export default Nav;
