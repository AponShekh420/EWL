import FadeInSection from "../common/FadeInSection"

const Hero = () => {
  return (
    <div className="bg-[url('/images/home/hero.png')] bg-cover bg-center bg-blend-overlay bg-black/50">
      <div className="container md:py-20 py-10">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        > 
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">הי שלום בחילך שלוה בארמנותיך</h1>
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
          delay={0.5}
        > 
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold lg:mt-7 mt-4 sm:mt-5 md:mt-6">Strengthen Your Marriage. <br/> Deepen Your Connection.</h2>
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
          delay={0.7}
        > 
          <p className="xl:w-1/3 sm:w-1/2 w-full text-md sm:text-lg lg:mt-7 mt-4 sm:mt-5 md:mt-6 text-white">We help Jewish couples build harmony and
          intimacy in marriage through trusted guidance,
          practical tools, and Torah-aligned wisdom.</p>
        </FadeInSection>
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
          className="flex gap-x-3 mt-7"
          delay={0.9}
        > 
          <button className="bg-[#0F75BC] px-5 py-2 h-9 rounded-full font-semibold text-white text-sm lg:text-md text-nowrap shadow-[5px_5px_15px_0px_#2700346c] hover:shadow-[5px_5px_15px_0px_#dad7dc6c] transition-all duration-150 transform hover:translate-y-[-5px]">Donate</button>
          <button className="bg-[#270034] px-5 py-2 h-9 rounded-full font-semibold text-white text-sm lg:text-md text-nowrap shadow-[5px_5px_15px_0px_#2700346c] hover:shadow-[5px_5px_15px_0px_#dad7dc6c] transition-all duration-150 transform hover:translate-y-[-5px]">Join InfoLine</button>
        </FadeInSection>
      </div>
    </div>
  );
}

export default Hero;