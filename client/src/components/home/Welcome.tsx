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
              Nurture Your Bond with
              Tranquility, Connection,
              and Kedusha
            </h1>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.5}
          > 
            <p className="mt-6 text-lg lg:text-xl font-semibold text-[#333333]">
              Torah-rooted guidance for couples seeking harmony,
              intimacy, and renewal
            </p>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.6}
          > 
            <p className="mt-6 text-base lg:text-lg text-[#333333]">
              Marriage is meant to be a source of joy, strength, and spiritual growth. Yet
              when challenges arise—especially in the most private and sensitive areas—
              many couples feel unsure where to turn.
            </p>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.7}
          > 
            <p className="mt-6 text-base lg:text-lg text-[#333333]">
            <b>Ohel Miriam</b> was founded to fill a vital gap: providing discreet, Torah-
            grounded guidance on marital harmony, intimacy, and related topics. We
            support Jewish couples with trusted insights, practical tools, and timeless
            wisdom to help their relationships flourish.
            </p>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.8}
          > 
            <p className="mt-6 text-base lg:text-lg text-[#333333]">Through live teleconferences, recordings and thoughtfully designed courses
              for both men and women, Ohel Miriam brings together Rabbanim, female
              educators, therapists, and medical professionals. Together, they offer
              compassionate, clear, and halachically sound perspectives to strengthen your
              home from the inside out.
            </p>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={0.9}
          > 
            <p className="mt-6 text-base lg:text-lg text-[#333333]">The Ohel Miriam Store provides personal care products—carefully selected
              resources that support comfort, dignity, and connection in marriage. Each
              item is chosen to gently nurture the sacred space between husband and wife
              —inviting warmth, tenderness, and playful connection into the heart of the
              home.
            </p>
          </FadeInSection>
          <FadeInSection
            initial={{ opacity: 0, y: 50 }}
            scrollTop={{ opacity: 1, y: 0 }}
            scrollBottom={{ opacity: 0, y: 50 }}
            margin="40px 0px -40px 0px"
            delay={1.0}
          > 
            <p className="mt-6 mb-14 text-base lg:text-lg text-[#333333]">Whether you&apos;re seeking deeper connection, greater understanding, or a path
              toward renewal—Ohel Miriam is here to guide you.
            </p>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}

export default Welcome;