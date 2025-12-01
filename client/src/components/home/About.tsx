import Image from "next/image";
import FadeInSection from "../common/FadeInSection";

const About = () => {
  return (
    <section className="mt-20">
      <div className="container">
        {/* row 1 */}
        <div className="flex md:flex-row flex-col-reverse gap-x-10 justify-between">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
            className="lg:w-3/5 md:w-1/2 w-full"
          >
            <h3 className="lg:text-4xl font-semibold text-2xl mt-6 md:mt-0">
              About Ohel Miriam
            </h3>
            <p className="lg:mt-7 lg:text-lg mt-3 ">
              Since 2014, Ohel Miriam has been a trusted source of guidance and
              inspiration for both men and women seeking to strengthen their
              homes. From our international hotline to exclusive shiurim,
              lectures, and divrei chizuk, we provide Torah-based wisdom and
              practical tools for kedushas habayis and shalom bayis — delivered
              with dignity, sensitivity, and care.
            </p>
            <button className="lg:mt-7 mt-3 bg-[#270034] px-5 py-2 lg:h-12 lg:w-44 rounded-full font-semibold text-white text-sm lg:text-lg text-nowrap shadow-[5px_5px_15px_0px_#2700346c] hover:shadow-[5px_5px_15px_0px_#dad7dc6c] transition-all duration-150 transform hover:lg:translate-y-[-5px] hover:translate-y-[-3px]">
              Who We Are
            </button>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, x: 150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: 150 }}
            margin="40px 0px -40px 0px"
            className="md:w-1/2 lg:w-2/5 w-full aspect-[4/3] relative bg-[#0F75BC] overflow-hidden rounded-3xl shadow-[5px_5px_15px_0px_#2700346c]"
          >
            <Image
              src="/images/home/image-one.png"
              alt="couple image"
              fill
              className="w-full h-full absolute p-5"
            />
          </FadeInSection>
        </div>

        {/* row 2 */}
        <div className="flex md:flex-row flex-col gap-x-10 justify-between mt-18 lg:mt-15">
          <FadeInSection
            initial={{ opacity: 0, x: -150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: -150 }}
            margin="40px 0px -40px 0px"
            className="md:w-1/2 lg:w-2/5 w-full aspect-[4/3] relative bg-[#0F75BC] overflow-hidden rounded-3xl shadow-[5px_5px_15px_0px_#2700346c]"
          >
            <Image
              src="/images/home/image-two.png"
              alt="couple image"
              fill
              className="w-full h-full absolute p-5"
            />
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, x: 150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: 150 }}
            margin="40px 0px -40px 0px"
            className="lg:w-3/5 md:w-1/2 w-full"
          >
            <h3 className="lg:text-4xl font-semibold text-2xl mt-6 md:mt-0">
              Shop
            </h3>
            <p className="lg:mt-7 lg:text-lg mt-3 ">
              Our shop offers discreet, high-quality products — from card games
              and guides to natural products and vitamins — all designed to
              support relationship and connection. Each item is carefully chosen
              to help couples strengthen their marriage in a practical,
              meaningful way.
            </p>
            <button className="lg:mt-7 mt-3 bg-[#270034] px-5 py-2 lg:h-12 lg:w-44 rounded-full font-semibold text-white text-sm lg:text-lg text-nowrap shadow-[5px_5px_15px_0px_#2700346c] hover:shadow-[5px_5px_15px_0px_#dad7dc6c] transition-all duration-150 transform hover:lg:translate-y-[-5px] hover:translate-y-[-3px]">
              Buy Now
            </button>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default About;
