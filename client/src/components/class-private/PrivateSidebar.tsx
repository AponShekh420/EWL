"use client";
import { toggleSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PrivateSidebar() {
  const [activeModule, setActiveModule] = useState(1);
  const [lock, setLock] = useState([2, 3]);

  const dispatch = useDispatch();
  const isShowSidebar = useSelector(
    (state: RootState) => state.sidebar.isShowSidebar,
  );

  return (
    <>
    {
      !isShowSidebar && (
          <div onClick={() => {
             dispatch(toggleSidebar());
          }} className="lg:hidden block cursor-pointer">
            <h5 className="pl-2 font-medium text-xl text-gray-800 py-4 flex">
              <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
            </h5>
          </div>
      )
    }
      <div
        className={`bg-white h-screen  px-4 fixed lg:sticky top-25 lg:top-20  w-4/5 sm:w-3/5 lg:w-64 2xl:w-72 left-0 transition-transform duration-300 z-10 border-r-2 border-gray-200 ${
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
            Class Records
          </h5>
          
          <ul className="space-y-2">
            {[1, 2, 3].map((link) => (
              <li key={link} className={`${lock.includes(link) ? "cursor-not-allowed opacity-50" : "cursor-pointer"} px-2 py-1 rounded-md font-semibold ${activeModule === link ? "bg-teal text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => !lock.includes(link) && setActiveModule(link)}>
                <div className="flex items-center gap-1">
                  <span>Module {link}</span>
                  {lock.includes(link) && <Icon icon="flat-color-icons:lock" width="20" height="20" />}
                </div>
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
    </>
  );
}
