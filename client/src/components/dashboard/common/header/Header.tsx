"use client";
import SearchPagePopup from "@/components/dashboard/common/header/SearchPagePopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toggleSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MessageBox from "./MessageBox";
import NotificationBox from "./NotificationBox";
import ProfileBox from "./ProfileBox";
import SettingsBox from "./SettingsBox";
export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`bg-white py-2 sticky top-0 z-50 ${
        scrolled ? "shadow-md shadow-black/10" : ""
      }`}
    >
      <nav className="px-8 py-2 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <button
            className="cursor-pointer lg:hidden"
            onClick={() => dispatch(toggleSidebar())}
          >
            <Icon icon="ri:menu-2-fill" width="25" height="25" />
          </button>
          <SearchPagePopup>
            <div className="relative sm:w-[20rem] lg:w-[30rem]">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-between w-full p-4">
                <div className="flex gap-1 items-center">
                  <Icon
                    icon="iconamoon:search-light"
                    className="size-6"
                    width="18"
                    height="18"
                  />
                  <p className="text-sm hidden sm:block">Search your page...</p>
                </div>

                <span className="search-command ms-auto hidden items-center text-sm text-white lg:flex lg:rounded-md lg:bg-blue-500 lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold lg:text-primary-foreground xl:justify-normal">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="1.3"
                    viewBox="0 0 256 256"
                    className="h-[15px] w-[15px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M180,144H160V112h20a36,36,0,1,0-36-36V96H112V76a36,36,0,1,0-36,36H96v32H76a36,36,0,1,0,36,36V160h32v20a36,36,0,1,0,36-36ZM160,76a20,20,0,1,1,20,20H160ZM56,76a20,20,0,0,1,40,0V96H76A20,20,0,0,1,56,76ZM96,180a20,20,0,1,1-20-20H96Zm16-68h32v32H112Zm68,88a20,20,0,0,1-20-20V160h20a20,20,0,0,1,0,40Z"></path>
                  </svg>
                  K
                </span>
              </div>

              <Input className="!py-2.5 h-full hidden sm:block" />
            </div>
          </SearchPagePopup>
        </div>
        <div className="flex gap-x-4 items-center">
          <NotificationBox>
            <div className="bg-white p-2 shadow rounded-md cursor-pointer relative">
              <Icon icon="basil:notification-on-solid" width="25" height="25" />
              <small className="bg-white rounded-full p-0.5 absolute top-1.5 h-fit">
                <span className="size-2 rounded-full bg-orange-500 block"></span>
              </small>
            </div>
          </NotificationBox>
          <MessageBox>
            <div className="bg-white p-2 shadow rounded-md cursor-pointer relative">
              <Icon icon="duo-icons:message-3" width="25" height="25" />
              <small className="bg-white rounded-full p-0.5 absolute top-1.5 h-fit">
                <span className="size-2 rounded-full bg-green-500 block"></span>
              </small>
            </div>
          </MessageBox>
          <SettingsBox>
            <div className="bg-white p-2 shadow rounded-md cursor-pointer">
              <Icon
                icon="lets-icons:setting-line-duotone-line"
                width="25"
                height="25"
              />
            </div>
          </SettingsBox>

          <ProfileBox>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ProfileBox>
        </div>
      </nav>
    </header>
  );
}
