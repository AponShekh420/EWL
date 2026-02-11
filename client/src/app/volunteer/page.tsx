import comedy_gif from "@/assets/volunteer/26comedycrash-illo-articleLarge.gif";
import check_scaled from "@/assets/volunteer/CHECK-scaled.jpg";
import corporate_businessman from "@/assets/volunteer/corporate-businessman-giving-presentation-large-audience-scaled.jpg";
import nathan_dumlao from "@/assets/volunteer/nathan-dumlao-ewGMqs2tmJI-unsplash-scaled.jpg";
import audio_editing from "@/assets/volunteer/photo-1536240478700-b869070f9279-e1545937131836.jpg";
import FadeInSection from "@/components/common/FadeInSection";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
export default function Volunteer() {
  return (
    <main>
      <section className="hero-banner grid place-items-center">
        <FadeInSection
          initial={{ opacity: 0, y: -50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -50 }}
          margin="40px 0px -40px 0px"
        >
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center">
            Get Involved
          </h1>
        </FadeInSection>
      </section>
      <section className="container mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <FadeInSection
          initial={{ opacity: 0, x: 50 }}
          scrollTop={{ opacity: 1, x: 0 }}
          scrollBottom={{ opacity: 0, x: 50 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper">
            <h2 className="font-semibold text-2xl md:text-3xl text-center mb-5 md:mb-8 lg:mb-10 text-gray-800">
              Reach Out And Get Involved!
            </h2>
            <p className="md:text-lg text-gray-800">
              Securing volunteers poses a unique challenge. Ohel Miriam rarely
              uses conventional marketing efforts like publication
              advertisements, poster displays, social media, etc. Our
              organization prioritizes privacy and prefers to discreetly share
              information. We recognize the presence of individuals eager to
              contribute, unaware of the opportunities at Ohel Miriam. Below is
              a list of positions awaiting fulfillment. If you believe you align
              with any of them, don’t hesitate to get in touch. Ohel Miriam will
              deeply appreciate your involvement!
            </p>
          </div>
        </FadeInSection>
      </section>
      <section className="container mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper grid md:grid-cols-[350px_1fr] lg:grid-cols-[380px_1fr] gap-4 md:gap-8 lg:items-center">
            <div className="">
              <h2 className="text-xl xs:text-2xl md:text-xl lg:text-2xl font-semibold mb-4 text-gray-800">
                Finding Potential Speakers
              </h2>
              <Image
                src={corporate_businessman}
                width={500}
                height={500}
                alt="blog"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <p className="text-sm xs:text-base lg:text-lg md:mt-12 lg:mt-0 text-gray-800">
              Are you an expert in mental health or education with the ability
              to address subjects like intimacy, financial management, marital
              relationships, and sexual health? If you possess these
              qualifications, we invite you to share your insights with our
              organization.
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdVAPmZ9bEhXq_rzKGVLtzvlnUwmQiZL09cOIr4wDXAzvxxtQ/viewform?embedded=true"
                className="font-bold underline hover:text-teal"
              >
                Click here
              </a>{" "}
              for more information. Alternatively, if you’re aware of someone
              fitting this description, kindly refer them to us. We are actively
              seeking top-notch speakers to enhance our organizational
              initiatives.
            </p>
          </div>
        </FadeInSection>
      </section>
      {/* start from right */}
      <section className="container mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper grid md:grid-cols-[1fr_350px] lg:grid-cols-[1fr_380px] gap-4 md:gap-8 lg:items-center">
            <p className="text-sm xs:text-base lg:text-lg md:mt-12 lg:mt-0 order-2 md:order-1 text-gray-800">
              We’re in search of volunteers skilled in audio editing to enhance
              the quality of our audio content and contribute to the production
              of our presentations. Whether you have experience or a strong
              interest in audio, you can support our meaningful mission by
              showcasing your expertise in audio editing. Your skills can make a
              positive impact! Don’t hesitate to reach out to us and get
              involved.
            </p>
            <div className="order-1 md:order-2">
              <h2 className="text-xl xs:text-2xl md:text-xl lg:text-2xl font-semibold mb-4 text-right text-gray-800">
                Audio Editing
              </h2>
              <Image
                src={audio_editing}
                width={500}
                height={500}
                alt="blog"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
        </FadeInSection>
      </section>
      <section className="container mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper grid md:grid-cols-[350px_1fr] lg:grid-cols-[380px_1fr] gap-4 md:gap-8 lg:items-center">
            <div className="">
              <h2 className="text-xl xs:text-2xl md:text-xl lg:text-2xl font-semibold mb-4 text-gray-800">
                Coordinate Live Classes
              </h2>
              <Image
                src={nathan_dumlao}
                width={500}
                height={500}
                alt="blog"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <p className="text-sm xs:text-base lg:text-lg md:mt-12 lg:mt-0 text-gray-800">
              We are seeking volunteers to assist in organizing and coordinating
              live speaker workshops focused on marital harmony and intimacy.
              This includes identifying and booking speakers aligned with our
              cause, as well as handling promotion and marketing. Coordinating
              these live classes involves managing numerous technical details.
              If you have a passion for event organization and coordination,
              your input would be greatly appreciated! This is an opportunity to
              gain valuable experience in event planning and make a meaningful
              difference in the lives of couples.
            </p>
          </div>
        </FadeInSection>
      </section>
      {/* start from right 2 */}
      <section className="container mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper grid md:grid-cols-[1fr_350px] lg:grid-cols-[1fr_380px] gap-4 md:gap-8 lg:items-center">
            <p className="text-sm xs:text-base lg:text-lg md:mt-12 lg:mt-0 order-2 md:order-1 text-gray-800">
              Are you skilled at bringing laughter into people’s lives? We’re in
              search of a comedian to convey the message of marital harmony and
              intimacy through a fun, humorous, and engaging approach. If you
              have the ability to contribute, please get in touch with us. We’d
              love to explore opportunities for you to share your talents with
              our audience.
            </p>
            <div className="order-1 md:order-2">
              <h2 className="text-xl xs:text-2xl md:text-xl lg:text-2xl font-semibold mb-4 text-right text-gray-800">
                Comedy
              </h2>
              <Image
                src={comedy_gif}
                width={500}
                height={500}
                alt="blog"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
        </FadeInSection>
      </section>
      <section className="container my-10 sm:my-14 md:my-16 lg:my-20">
        <FadeInSection
          initial={{ opacity: 0, y: 50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: 50 }}
          margin="40px 0px -40px 0px"
        >
          <div className="wrapper grid md:grid-cols-[350px_1fr] lg:grid-cols-[380px_1fr] gap-4 md:gap-8 lg:items-center">
            <div className="">
              <h2 className="text-xl xs:text-2xl md:text-xl lg:text-2xl font-semibold mb-4 text-gray-800">
                Help us build stronger marriages
              </h2>
              <Image
                src={check_scaled}
                width={500}
                height={500}
                alt="blog"
                className="w-full h-[200px] object-cover"
              />
            </div>
            <p className="text-sm xs:text-base lg:text-lg md:mt-12 lg:mt-0 text-gray-800">
              Every couple deserves to have a strong and fulfilling relationship
              al pey taharas hakodesh. We organize speakers on marital harmony
              and intimacy, to provide couples with the tools and resources they
              need to build a happy and healthy marriage. Your support will
              enable us to keep promoting Ohel Miriam and providing top-notch
              speakers, life-changing courses and transformative products that
              help couples build stronger, more fulfilling relationships.{" "}
              <Link
                href="/optional-donation/"
                className="font-bold underline hover:text-teal"
              >
                Please help
              </Link>
              .
            </p>
          </div>
          <a
            href="mailto:ohelmiriam@gmail.com"
            className="bg-gradient-to-b hover:bg-gradient-to-t hover:scale-105 transition-all shadow-lg shadow-black duration-300 from-black to-teal text-xl lg:text-2xl font-semibold capitalize py-3 rounded-sm px-8 flex items-center gap-2.5 text-white mx-auto mt-20 w-fit "
          >
            <Icon
              icon="icon-park-outline:email-down"
              width="32"
              height="32"
              className="size-6 lg:size-8"
            />
            <span className="relative top-0.5">Email us</span>
          </a>
        </FadeInSection>
      </section>
    </main>
  );
}
