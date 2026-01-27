import "@/app/home.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-[#0F75BC] w-full footer">
      <div className="container py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-between gap-10">
        {/* col-1 */}
        <div>
          <p className=" mt-0 sm:mt-10 !text-nowrap text-[18px] font-terminal text-center text-white leading-[20px]"><strong className="italic">M</strong>aximizing <strong className="italic">I</strong>ntimate <br/> <strong className="italic">R</strong>elationships <strong className="italic">I</strong >n <strong className="italic">A</strong> <strong className="italic">M</strong>arriage</p>
        </div>

        {/* col-2 */}
        <div>
          <h3 className="font-bold text-lg text-white">Quick Links</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link
              href="/"
              className="transition-all hover:text-[#270034] text-white duration-150"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              About
            </Link>
            <Link
              href="/other-resources"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              Other Resources
            </Link>
            <Link
              href="/get-involved"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              Get Involved
            </Link>
          </div>
        </div>

        {/* col-3 */}
        <div>
          <h3 className="font-bold text-lg text-white">Services</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link
              href="/free-conferences"
              className="transition-all hover:text-[#270034] text-white duration-150"
            >
              Free Conferences
            </Link>
            <Link
              href="/free-recordings"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              Free Recordings
            </Link>
            <Link
              href="/shop"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              Store
            </Link>
            <Link
              href="/courses"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              Courses
            </Link>
          </div>
        </div>

        {/* col-4 */}
        <div>
          <h3 className="font-bold text-lg text-white">Contact Us</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link
              href="/free-conferences"
              className="transition-all hover:text-[#270034] text-white duration-150"
            >
              5 Imperial Lane <br /> Spring Valley NY
            </Link>
            <Link
              href="/free-recordings"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              example@gmail.com
            </Link>
            <Link
              href="tel:+18454148016"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              hotline (845) 414-8016
            </Link>
          </div>
        </div>

        {/* col-5 */}
        <div>
          <h3 className="font-bold text-lg text-white">Dial In Services</h3>
          <div className="flex flex-col mt-3 md:mt-4">
            <Link
              href="tel:+18452883873"
              className="transition-all hover:text-[#270034] text-white duration-150"
            >
              call/ text (845) 288-3873
            </Link>
            <Link
              href="tel:+18454009559"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              course pay (845) 400-9559
            </Link>
            <Link
              href="tel:+18454009965"
              className="mt-2 sm:mt-3 transition-all hover:text-[#270034] text-white duration-150"
            >
              ecommerce (845) 400-9965
            </Link>
          </div>

          <div className="flex items-center justify-center flex-col mt-6">
            <h3 className="font-bold text-xl text-white text-center">
              We Want To Hear From You!
            </h3>
            <div className="flex flex-col items-center border-t-2 sm:mt-3 mt-4 border-[#0F75BC] w-full h-14">
              <button className="bg-[#270034] py-2 px-4 w-52 rounded-full hover:-mt-[5px] text-white uppercase font-[500] border-[#0998ff] border-2 hover:shadow-[5px_5px_15px_0px_#2700346c] transition-all duration-150">
                Take The Survey!
              </button>
            </div>
          </div>

        </div>
      </div>
      <hr />
      <div className="container">
        <p className="text-center text-white py-2 text-[13.333px]">Ohel Miriam does not endorse any of its speakers. Each speaker has their own haskomos or is affiliated with their own Rav. Kindly do research or consult with your halachic authority to enable you to make a decision that is right for you.  ©2021 All Rights Reserved by Ohel Miriam</p>
      </div>
    </div>
  );
};

export default Footer;
