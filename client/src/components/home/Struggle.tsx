import phoneIcon from "@/assets/png/phone-icon.png";
import teacherIcon from "@/assets/png/teacher-icon.png";
import candleIcon from "@/assets/png/candle-icon.png";
import headsetIcon from "@/assets/png/headset-icon.png";
import Image from "next/image";
import { Button } from "../ui/button";
import FadeInSection from "../common/FadeInSection";
export default function Struggle() {
  return (
    <section className="container mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6 text-center md:text-left">
        <div>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0}
          >
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {" "}
              Want to hear from more speakers?
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.3}
          >
            <p className="text-lg mt-4">
              Discover voices of wisdom and guidance to strengthen your marriage
              and elevate your home.
            </p>
          </FadeInSection>
        </div>
        <FadeInSection
            initial={{ opacity: 0, x: 150 }}
            scrollTop={{ opacity: 1, x: 0 }}
            scrollBottom={{ opacity: 0, x: 150 }}
            margin="40px 0px -40px 0px"
            delay={0}
          >
          <Button className="rounded-xl px-8 py-6 text-base">
            Discover More
          </Button>
        </FadeInSection>
      </div>
      <div className="mt-20 grid gap-14 md:gap-6 md:grid-cols-[2fr_3fr]">
        <FadeInSection 
          initial={{ opacity: 0, x: -150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: -150 }}
          margin="40px 0px -40px 0px"
          className="md:max-w-[330px] text-center md:text-left"
        >
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            From Struggle to Strength
          </h3>
          <p className="mt-4 mb-8 sm:text-lg lg:text-xl">
            Ohel Miriam strengthens couples in building marriages grounded in kedusha, shalom, and simcha.  Through this journey, you’ll gain four essential gifts for deeper connection and harmony.
          </p>
          <Button className="rounded-xl px-8 py-6 text-base">
            Discover More
          </Button>
        </FadeInSection>
        <FadeInSection 
          initial={{ opacity: 0, x: 150 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 150 }}
          margin="40px 0px -40px 0px"
          className="space-y-2">
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={phoneIcon}
                width={100}
                height={100}
                alt="PhoneIcon"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Get confidence and clarity across many areas of married life. Learn to articulate what was hidden in silence, Expose yourself to topics you didn’t know you needed, and have the option to go deeper with one-on-one guidance if you so choose.</p>
            </div>
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={teacherIcon}
                width={100}
                height={100}
                alt="teacherIcon"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Feel empowered and equipped with practical tools to troubleshoot challenges, and be able to transform closeness from something stilted into something natural. Gain depth and awareness on a specific topic, with Torah guidance that replaces confusion with clarity and stress with strength.</p>
            </div>
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={candleIcon}
                width={100}
                height={100}
                alt="candleIcon"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Enjoy richer connection, renewed vitality, and a warm, playful atmosphere that makes intimacy feel natural and exciting.</p>
            </div>
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={headsetIcon}
                width={100}
                height={100}
                alt="headsetIcon"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Get clear direction and practical tools to navigate many aspects of marital life.</p>
            </div>
        </FadeInSection>
      </div>
    </section>
  );
}
