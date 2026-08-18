import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

const MobileMenu = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // toggle the submenu open/closed instead of navigating immediately
    setServicesOpen((prev) => !prev);
  };

  const handleServicesLinkClick = (e: React.MouseEvent) => {
    // this runs when they tap "Services" text itself, not the submenu items
    e.preventDefault();

    if (pathname === "/") {
      document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" });
      setToggle(false);
    } else {
      router.push("/");
      setTimeout(() => {
        document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      setToggle(false);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-black/50 flex transition-opacity duration-300
        ${toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={() => setToggle(false)}
    >
      <div
        className={`
          sm:min-w-80 min-w-72 bg-white h-full p-4 transition-transform duration-300
          overflow-y-auto
          ${toggle ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
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

        <div className="sm:min-w-[130px] sm:max-w-[130px] min-w-[110px] max-w-[110px] sm:h-16 h-14 relative mx-auto -mt-5">
          <Image src="/logo.png" alt="logo" fill className="h-full w-auto" />
        </div>

        <div className="flex flex-col border-t-2 sm:mt-3 mt-4 border-[#0F75BC] text-[1.05rem]">
          <Link
            href="/"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            About
          </Link>

          {/* SERVICES WITH CLICK-TOGGLE SUBMENU */}
          <div className="border-b">
            <div className="flex items-center justify-between px-2.5 py-2">
              <button
                onClick={handleServicesLinkClick}
                className="text-[#270034] hover:text-[#0F75BC] transition-all duration-150 text-left"
              >
                Services
              </button>

              {/* chevron toggles the submenu, separate from navigating */}
              <button
                onClick={handleServicesClick}
                aria-label="Toggle services submenu"
                className="p-1"
              >
                <Icon
                  icon="mdi:chevron-down"
                  width="20"
                  height="20"
                  className={`text-[#270034] transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Submenu: height/opacity transition instead of group-hover */}
            <div
              className={`overflow-hidden transition-all duration-200 ${
                servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="py-2 bg-[#F9FAFB]">
                <li>
                  <Link
                    href="/free-demos"
                    className="block px-6 py-2 text-sm text-[#270034] hover:bg-[#F3F4F6] hover:text-[#0F75BC]"
                    onClick={() => setToggle(false)}
                  >
                    Free Demos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/infoline"
                    className="block px-6 py-2 text-sm text-[#270034] hover:bg-[#F3F4F6] hover:text-[#0F75BC]"
                    onClick={() => setToggle(false)}
                  >
                    Infoline
                  </Link>
                </li>
                <li>
                  <Link
                    href="/membership"
                    className="block px-6 py-2 text-sm text-[#270034] hover:bg-[#F3F4F6] hover:text-[#0F75BC]"
                    onClick={() => setToggle(false)}
                  >
                    Membership
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="block px-6 py-2 text-sm text-[#270034] hover:bg-[#F3F4F6] hover:text-[#0F75BC]"
                    onClick={() => setToggle(false)}
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/classes"
                    className="block px-6 py-2 text-sm text-[#270034] hover:bg-[#F3F4F6] hover:text-[#0F75BC]"
                    onClick={() => setToggle(false)}
                  >
                    Classes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="block px-6 py-2 text-sm text-[#270034] hover:bg-[#F3F4F6] hover:text-[#0F75BC]"
                    onClick={() => setToggle(false)}
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/courses"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Courses
          </Link>
          <Link
            href="/classes"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Classes
          </Link>
          <Link
            href="/shop"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Shop
          </Link>
          <Link
            href="/speakers"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Speakers
          </Link>
          <Link
            href="/volunteer"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Get Involved
          </Link>
          <Link
            href="/blog"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Blog
          </Link>
          <Link
            href="/resources"
            className="px-2.5 py-2 hover:bg-[#0F75BC] text-[#270034] hover:text-white duration-150 border-b"
            onClick={() => setToggle(false)}
          >
            Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;