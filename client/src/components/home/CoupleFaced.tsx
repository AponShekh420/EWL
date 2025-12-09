import { coupleFacesData } from "@/constants/home";
import { Icon } from "@iconify/react";
import FadeInSection from "../common/FadeInSection";

export default function CoupleFaced() {
  return (
    <section className="mt-20">
      <div className="bg-ligtGray">
        <div className="container py-14">
          <div className="text-center">
            <FadeInSection
              initial={{ opacity: 0, y: 50 }}
              scrollTop={{ opacity: 1, y: 0 }}
              scrollBottom={{ opacity: 0, y: 50 }}
              margin="40px 0px -40px 0px"
            > 
              <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                The Challenge Every Couple Faces
              </h1>
            </FadeInSection>
            <FadeInSection
              initial={{ opacity: 0, y: 50 }}
              scrollTop={{ opacity: 1, y: 0 }}
              scrollBottom={{ opacity: 0, y: 50 }}
              margin="40px 0px -40px 0px"
              delay={0.5}
            >
              <p className="mt-4 mb-14 text-base mg:text-lg">
                When struggles go unresolved, distance and frustration can quietly
                grow.
              </p>
            </FadeInSection>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:flex flex-wrap gap-8 justify-center text-white">
            {coupleFacesData.map((data, index) => (
              <FadeInSection
                key={data.id}
                initial={{ opacity: 0, y: 50 }}
                scrollTop={{ opacity: 1, y: 0 }}
                scrollBottom={{ opacity: 0, y: 50 }}
                margin="40px 0px -40px 0px"
                delay={index == 0 ? 0 : (index/10) * 2}
                className="bg-teal p-10 flex flex-col justify-center items-center text-center xl:min-w-[350px]  rounded-sm basis-1"
              >
                <Icon
                  icon="fluent-emoji-high-contrast:broken-heart"
                  width="50"
                  height="50"
                  className="size-[40px] md:size-[50px]"
                />
                <p className="text-base md:text-lg mt-5">{data.desc}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
