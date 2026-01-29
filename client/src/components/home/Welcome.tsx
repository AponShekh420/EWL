import Image from "next/image";
import FadeInSection from "../common/FadeInSection";

const Welcome = () => {
  return (
    <section className="container mt-20 space-y-24">
      
      {/* ================= HERO / INTRO ================= */}
      <FadeInSection
        initial={{ opacity: 0, y: 50 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: 50 }}
        margin="40px 0px -40px 0px"
      >
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center max-w-[1080px] mx-auto leading-tight">
          Nurture Your Bond with <br />
          <span className="text-[#6B2D84]">
            Tranquility, Connection, and Kedusha
          </span>
        </h1>
      </FadeInSection>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col-reverse md:flex-row gap-12">
        
        {/* TEXT */}
        <FadeInSection
          className="xl:w-4/5 lg:w-3/5 md:w-1/2 w-full"
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
          delay={0.3}
        >
          <p className="text-lg lg:text-xl text-[#333333] leading-relaxed space-y-4">
            <span className="block font-semibold">
              Marriage is a source of simcha, zivug, and ruchnius.
            </span>

            Yet when challenges arise — especially in matters of
            <span className="font-semibold"> kedusha habayis</span> —
            couples may feel uncertain.

            <br /><br />

            <span className="font-semibold">Ohel Miriam</span> was founded to fill a vital gap:
            providing discreet, Torah-grounded guidance on marital harmony,
            intimacy, and related topics.

            <br /><br />

            Through live teleconferences, recordings,
            and thoughtfully designed courses,
            we bring together educators, therapists,
            and medical professionals — offering compassionate,
            clear perspectives to strengthen your home
            from the inside out.
          </p>
        </FadeInSection>

        {/* IMAGE */}
        <FadeInSection
          className="xl:w-1/5 lg:w-2/5 md:w-1/2 w-full"
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
          delay={0.3}
        >
          <Image
            src="/images/home/home-welcome.jpg"
            alt="Ohel Miriam Welcome"
            className="w-full h-auto rounded-2xl shadow-xl"
            width={300}
            height={200}
            priority
          />
        </FadeInSection>
      </div>

      {/* ================= STORE SECTION ================= */}
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* IMAGE */}
        <FadeInSection
          className="xl:w-2/5 lg:w-2/5 md:w-1/2 w-full"
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <Image
            src="/images/home/istockphoto-584574708-612x612.webp"
            alt="Ohel Miriam Store"
            className="w-full h-auto rounded-2xl shadow-xl"
            width={300}
            height={200}
          />
        </FadeInSection>

        {/* TEXT */}
        <FadeInSection
          className="xl:w-3/5 lg:w-3/5 md:w-1/2 w-full"
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
          delay={0.2}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">
            The Ohel Miriam Store
          </h2>

          <p className="text-lg text-[#333333] leading-relaxed">
            The Ohel Miriam Store offers thoughtfully selected personal care products
            designed to support comfort, dignity, and connection in marriage.

            <br /><br />

            Each item gently nurtures the cherished relationship between husband
            and wife — inviting warmth, tenderness, and playful connection
            into the heart of the zivug.
          </p>
        </FadeInSection>
      </div>

    </section>
  );
};

export default Welcome;
