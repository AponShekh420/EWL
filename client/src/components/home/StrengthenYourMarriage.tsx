import { strengthenYourMarriageData } from "@/constants/home";
import FadeInSection from "../common/FadeInSection";

export default function StrengthenYourMarriage() {
  return (
    <section className="mt-20 bg-lightRed py-10" id="services-section">
      <div className="container">
        <div className="text-center max-w-[700px] mx-auto">
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-teal">
              Here’s how to strengthen you marriage, Inside & Out
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
              Explore our services designed to guide Orthodox couples toward
              deeper connection, harmony, and kedushah in the home.
            </p>
          </FadeInSection>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8  xl:gap-10 mt-14">
          {strengthenYourMarriageData.map((data, index) => (
            <FadeInSection
              key={data.id}
              initial={{ opacity: 0, y: 50 }}
              scrollTop={{ opacity: 1, y: 0 }}
              scrollBottom={{ opacity: 0, y: 50 }}
              margin="40px 0px -40px 0px"
              delay={index == 0 ? 0 : (index/10) * 2}
              className="border border-teal rounded overflow-hidden"
            >
              <h1 className="text-2xl font-medium bg-teal px-8 py-0.5 w-full left-0 text-white font-mono border-x-4 border-teal">
                {data.category}
              </h1>
              <div className="p-8">
                <h2 className="font-bold text-lg">{data.title}</h2>
                <p>{data.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
