import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white h-20 shadow-[0px_0px_15px_0px_#C5C5C5]">
        <div className="container flex justify-between items-center h-full gap-x-2 py-2">
          {/* logo */}
          <div className="min-w-[130px] max-w-[130px] h-full relative">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="h-full w-auto"
            />
          </div>

          {/* menu */}
          <div className="flex flex-wrap">
            <Link href={"/"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Home</Link>
            <Link href={"/about"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">About</Link>
            <Link href={"/services"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Services</Link>
            <Link href={"/courses"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Courses</Link>
            <Link href={"/shop"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Shop</Link>
            <Link href={"/speakers"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Speakers</Link>
            <Link href={"/volunteer"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Volunteer</Link>
            <Link href={"/blogs"} className="px-2 py-1 text-[#270034] hover:text-[#0F75BC] transition-all duration-150">Blog</Link>
          </div>

          {/* buttons */}
          <div className="flex gap-x-2.5">
            <button className="bg-[#0F75BC] py-1.5 px-4 rounded-full font-semibold text-white text-sm">Donate</button>
            <button className="bg-[#270034] py-1.5 px-4 rounded-full font-semibold text-white text-sm">InfoLine</button>
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
    </div>
  );
}

export default Nav;