"use client";
import { sidebar_links } from "@/constants/sidebar_links";
import { toggleSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinkWrapper from "./LinkWrapper";

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarLinks, setSidebarLinks] =
    useState<typeof sidebar_links>(sidebar_links);

  const dispatch = useDispatch();
  const isShowSidebar = useSelector(
    (state: RootState) => state.sidebar.isShowSidebar
  );

  return (
    <div
      className={`bg-white h-screen  px-4 fixed lg:sticky top-20 lg:top-0  w-4/5 sm:w-3/5 lg:w-64 2xl:w-72 left-0 transition-transform duration-300 z-10 border-r-2 border-gray-200 ${
        isShowSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="relative">
        <h5 className="pl-2 font-medium text-xl text-gray-800 py-4 flex">
          <Icon
            icon="streamline:global-learning-remix"
            width="32"
            height="32"
          />{" "}
          eLearning
        </h5>
        <h5 className="px-2 mt-8 pb-2 uppercase text-sm font-semibold">
          Overview
        </h5>
        <ul className="space-y-4">
          {sidebarLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => {
                if (link.isDropdown) {
                  const filterSiderbar = sidebarLinks.map((sidebarlink) => {
                    if (sidebarlink.id == link.id) {
                      return {
                        ...sidebarlink,
                        isShowDropdown: !sidebarlink.isShowDropdown,
                      };
                    }
                    return sidebarlink;
                  });
                  setSidebarLinks(filterSiderbar as typeof sidebar_links);
                } else {
                  dispatch(toggleSidebar());
                }
              }}
            >
              <LinkWrapper
                href={link.url}
                isDropDown={link.isDropdown as boolean}
                className={`flex items-center justify-between gap-x-2 py-2 px-2 rounded-md text-gray-800 transition-colors duration-200  text-base hover:bg-gray-200 cursor-pointer ${
                  link.url === pathname ? "bg-gray-200 " : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon icon={link.icon} width="24" height="24" />
                  <span>{link.name}</span>
                </div>
                {link.isDropdown &&
                  (link.isShowDropdown ? (
                    <Icon icon="oui:arrow-down" width="18" height="18" />
                  ) : (
                    <Icon icon="oui:arrow-right" width="18" height="18" />
                  ))}
              </LinkWrapper>
              <ul
                className={` capitalize  ${
                  link.isDropdown
                    ? link.isShowDropdown
                      ? "block"
                      : "hidden"
                    : "hidden"
                } `}
              >
                {link.dropdownList?.map((dropdown) => (
                  <li key={dropdown.id}>
                    <Link
                      className="py-2 flex gap-x-2 items-center ml-6 px-4 rounded-md transition-colors duration-200  text-base hover:bg-gray-200 "
                      href={dropdown.url}
                    >
                      <span className="size-1.5 bg-gray-500 inline-block rounded-full"></span>
                      {dropdown.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            dispatch(toggleSidebar());
          }}
          className="cursor-pointer absolute top-2 -right-2.5  p-3 rounded-r-full lg:hidden hover:text-red-500"
        >
          <Icon icon="material-symbols:close" width="28" height="28" />
        </button>
      </div>
    </div>
  );
}
