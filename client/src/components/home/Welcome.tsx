import FadeInSection from "../common/FadeInSection";

const Welcome = () => {
  return (
    <div>
      <div className="container mt-20">
        <div className="text-center max-w-[1080px] mx-auto">
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
          > 
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
              You want a home filled with peace, connection, and holiness.
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.5}
          > 
            <p className="mt-4 mb-14 text-base lg:text-lg text-[#333333]">
              But when challenges arise in marriage — especially in the private areas of life — it can feel overwhelming.
              Many couples don&apos;t know where to turn for discreet, Torah-true guidance.  
              <b>Ohel Miriam was created to address knowledge gaps on the 
              Torah perspective of marital harmony, intimate relationships and related topics.</b>
              Ohel Miriam helps Jewish couples build harmony and intimacy in marriage
              through trusted guidance, practical tools, and Torah-aligned wisdom.
              Ohel Miriam gives you the tools and knowledge to build a marriage that truly thrives. 
              Ohel Miriam arranges live teleconferences and courses, catering to both men and women alike. These sessions feature insights from Rabbanim, women lecturers, therapists and medical professionals.
            </p>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}

export default Welcome;