"use client";
import { getCourseModules } from "@/actions/getCourseModules";
import { toggleSidebar } from "@/redux/features/sidebar/sidebarSlice";
import { RootState } from "@/redux/store";
import { modulesType } from "@/types/Course";
import { Icon } from "@iconify/react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

type PrivateSidebarProps = {
  slug: string;
  activeModule: string;
  setActiveModule: Dispatch<SetStateAction<string>>;
};

export default function PrivateSidebar({
  slug,
  activeModule,
  setActiveModule,
}: PrivateSidebarProps) {
  const [modules, setModules] = useState<modulesType[]>([])
  const dispatch = useDispatch();
  const isShowSidebar = useSelector(
    (state: RootState) => state.sidebar.isShowSidebar,
  );

  const getModulesData = async () => {
    try {
      const data = await getCourseModules(slug)
      if(data.success) {
        setModules(data.modules)
        setActiveModule(data.modules[0].name)
      } else {
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
      } else {
        console.log(err);
      }
    }
  }


  useEffect(()=> {
    getModulesData()
  }, [])

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
            {modules.map((link, index) => (
              <li key={index} className={`cursor-pointer px-2 py-1 rounded-md font-semibold ${activeModule === link.name ? "bg-teal text-white" : "bg-gray-200 text-gray-800"}`} onClick={() => setActiveModule(link.name)}>
                <div className="flex items-center gap-1">
                  <span>{link.name}</span>
                  {/* {lock.includes(link.name) && <Icon icon="flat-color-icons:lock" width="20" height="20" />} */}
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
