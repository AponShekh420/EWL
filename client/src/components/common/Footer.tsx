import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#0F75BC] w-full py-14">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-10">
        {/* col-1 */}
        <div>
          <h3 className="font-bold text-lg text-white">Quick Links</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link href="/" className="transition-all hover:text-[#270034] text-white duration-150">
              Home
            </Link>
            <Link href="/about" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              About
            </Link>
            <Link href="/other-resources" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              Other Resources
            </Link>
            <Link href="/get-involved" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              Get Involved
            </Link>
          </div>
        </div>

        {/* col-2 */}
        <div>
          <h3 className="font-bold text-lg text-white">Services</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link href="/free-conferences" className="transition-all hover:text-[#270034] text-white duration-150">
              Free Conferences
            </Link>
            <Link href="/free-recordings" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              Free Recordings
            </Link>
            <Link href="/shop" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              Store
            </Link>
            <Link href="/courses" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              Courses
            </Link>
          </div>
        </div>

        {/* col-3 */}
        <div>
          <h3 className="font-bold text-lg text-white">Contact Us</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link href="/free-conferences" className="transition-all hover:text-[#270034] text-white duration-150">
              5 Imperial Lane <br/> Spring Valley NY
            </Link>
            <Link href="/free-recordings" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              oh******@gmail.com
            </Link>
            <Link href="/shop" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              (845) 414-8016 x3
            </Link>
            <Link href="/courses" className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150">
              (845) 288-3873
            </Link>
          </div>
        </div>

        {/* col-4 */}
        <div className="flex items-center justify-center flex-col">
          <h3 className="font-bold text-xl text-white text-center">We Want To Hear From You!</h3>
          <div className="flex flex-col items-center border-t-2 sm:mt-3 mt-4 border-[#0F75BC] w-full h-14">
            <button className="bg-[#270034] py-2 px-4 w-52 rounded-full hover:-mt-[5px] text-white uppercase font-[500] border-[#0998ff] border-2 hover:shadow-[5px_5px_15px_0px_#2700346c] transition-all duration-150">Take The Survey!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;