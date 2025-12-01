import family from "@/assets/png/family.png";
import handshake from "@/assets/png/handshake.png";
import handshake2 from "@/assets/png/handshake2.png";
import spark from "@/assets/png/spark.png";
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
          className="md:max-w-[250px] text-center md:text-left"
        >
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            From Struggle to Strength
          </h3>
          <p className="mt-4 mb-8 sm:text-lg lg:text-xl">
            With wisdom, empathy, and Torah-based guidance, Ohel Miriam empowers
            couples to build marriages of peace, holiness, and joy.
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
                src={handshake}
                width={100}
                height={100}
                alt="handshake"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Compassionate, discreet support for sensitive struggles</p>
            </div>
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={spark}
                width={100}
                height={100}
                alt="spark"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Trusted rabbinic and professional guidance with proven tools</p>
            </div>
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={family}
                width={100}
                height={100}
                alt="family"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>A home transformed into a place of peace, holiness, and joy</p>
            </div>
            <div className="bg-[#f9e1ef] py-2 px-10 flex items-center gap-x-5">
              <Image
                src={handshake2}
                width={100}
                height={100}
                alt="handshake2"
                className="w-16 md:w-20 lg:w-24 h-auto"
              />

              <p>Intimacy restored as a source of closeness and connection</p>
            </div>
        </FadeInSection>
      </div>
    </section>
  );
}
