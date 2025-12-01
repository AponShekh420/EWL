import { struggleToStrengthData } from "@/constants/home";
import { Button } from "../ui/button";
import FadeInSection from "../common/FadeInSection";

export default function StuggleToStrength() {
  return (
    <section className="mt-20">
      <div className="container">
        <div className="text-center max-w-[700px] mx-auto">
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0}
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              From Struggle to Strength
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.3}
          >
            <p className="md:text-lg mt-4">
              With wisdom, empathy, and Torah-based guidance, Ohel Miriam empowers
              couples to build marriages of peace, holiness, and joy
            </p>
          </FadeInSection>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 mt-20">
          {struggleToStrengthData.map((data, index) => (
            <FadeInSection
              key={data.id}
              initial={{ opacity: 0, y: 50 }}
              scrollTop={{ opacity: 1, y: 0 }}
              scrollBottom={{ opacity: 0, y: 50 }}
              margin="40px 0px -40px 0px"
              delay={index == 0 ? 0 : (index/10) * 2}
              className="text-center border border-teal px-4 pt-18 pb-4 relative"
            >
              <span className="bg-teal size-18 md:size-20 lg:size-24 flex items-center justify-center text-white text-4xl font-bold rounded-full absolute top-[-25%] right-1/2 translate-x-1/2">
                {data.id}
              </span>
              <h2 className="text-xl md:text-2xl font-semibold capitalize ">
                {data.title}
              </h2>
              <p className="text-lg md:text-xl font-medium mt-2 text-gray-700">
                {data.desc}
              </p>
            </FadeInSection>
          ))}
        </div>
      </div>
      <div className="bg-darkPink text-white py-14 mt-14 px-8">
        <div className="text-center max-w-[800px] mx-auto">
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0}
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Reignite Your Marriage with Torah-Based Guidance
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.3}
          >
          <p className="text-base lg:text-lg mt-4 mb-8">
            {" "}
            Discover shiurim, courses, and practical tools designed to
            strengthen shalom bayis and deepen kedushas habayis — all with
            sensitivity and discretion
          </p>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.5}
          >
          <Button className="bg-teal md:text-lg px-8 rounded-2xl">
            Join the InfoLine Today
          </Button>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
