import CoupleDoing from "@/assets/about/cople-doing.webp";
import HelpingHand from "@/assets/about/helping-hend.webp";
import mission from "@/assets/about/mission.webp";
import ohelComes from "@/assets/about/ohel-comes.webp";
import Image from "next/image";
const someProblems = [
  "Is what we’re experiencing normal in marriage?",
  "Why do we care about each other but still feel distant?",
  "Why is communication turning into hurt feelings?",
  "I wish I could ask someone… but I’m embarrassed.",
  "My spouse is struggling and I don’t know how to help.",
  "We were never taught how to navigate this part of marriage.",
];
export default function About() {
  return (
    <main className="text-center md:text-left">
      <section className="container mt-12 md:mt-16 lg:mt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr] md:gap-x-10 lg:gap-x-16">
          <div>
            <div>
              <Image
                src={CoupleDoing}
                alt="couple"
                width={900}
                height={600}
                className="rounded-xl border object-cover max-h-110"
              />
            </div>
            <p className="mt-4 sm:text-lg">
              Sometimes a couple is doing everything right… and still something
              in the marriage feels painful or distant. A kallah may feel
              overwhelmed and unsure what is normal. A wife of many years may
              quietly feel alone. A husband may be struggling with pressures or
              questions he has never felt able to ask. Many of these concerns
              are deeply personal — and often never discussed, even with close
              family or rabbanim.
            </p>
          </div>
          <div className="mt-10 md:mt-0">
            <h2 className="text-lg sm:text-xl font-semibold">
              You Might Relate If…”
            </h2>
            <ul className="font-medium space-y-5 mt-8 md:list-disc ml-8 md:ml-0">
              {someProblems.map((problem, id) => (
                <li key={id}>{problem}</li>
              ))}
            </ul>
            <p className="text-xl lg:text-2xl font-bold text-teal pt-10 lg:pt-20">
              Ohel Miriam was created to address those moments.
            </p>
          </div>
        </div>
      </section>
      <section className="container mt-12 md:mt-16 lg:mt-20 grid md:grid-cols-2 gap-10">
        <div className="order-2 md:order-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
            How We Help
          </h2>
          <div className="mt-4 sm:text-lg lg:text-xl lg:leading-[40px]">
            <p>
              Through our recordings and conference calls, you can hear
              experienced educators address real-life situations and questions
              that are rarely discussed openly.
            </p>
            <p>
              For those who wish to learn more, we offer structured courses and
              lecture series that present practical guidance and hashkafas
              haTorah on building a peaceful and respectful home.
            </p>
            <p>
              We invite you to explore our resources and read the blog. Listen &
              participate at your own pace, gaining clarity, chizuk, and a
              healthier perspective on the challenges of marriage.
            </p>
          </div>
        </div>
        <Image
          src={HelpingHand}
          alt="how we help"
          height={600}
          width={600}
          className="w-90 sm:w-110 lg:w-130 object-cover order-1 md:order-2 mx-auto md:mx-0"
        />
      </section>
      <section className="container mt-12 md:mt-16 lg:mt-20 grid md:grid-cols-2 gap-10">
        <div>
          <Image
            src={mission}
            height={600}
            width={600}
            className="w-100 sm:w-110 lg:w-130 object-cover mx-auto md:mx-0"
            alt="how we help"
          />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
            Our Mission
          </h2>
          <div className="mt-4 sm:text-lg lg:text-xl lg:leading-[40px]">
            <p>
              Our mission is to strengthen shalom bayis and kedushas habayis
              according to hashkafas haTorah and making it accessible and
              approachable for both women and men.
            </p>
            <p>
              Through lectures, recordings, courses, and resources, Ohel Miriam
              offers clarity, awareness, and chizuk in areas of marriage that
              are often difficult to address openly — yet deeply affect a
              Yiddishe home
            </p>
          </div>
        </div>
      </section>
      <section className="container my-12 md:my-16 lg:my-20 grid md:grid-cols-2 md:gap-10">
        <div className="order-2 md:order-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
            How Ohel Miriam Came to Be
          </h2>
          <div className="mt-4 sm:text-lg  lg:text-xl lg:leading-[40px]">
            <p>
              IIn 2014, an anonymous phone call was made to Mrs. Malka Touger
              from Eretz Yisroel, asking her to present a lecture for women on
              shalom bayis and marital harmony. Mrs. Touger, a teacher and
              international lecturer and co-author of The Secret to My Jewish
              Femininity, agreed to speak.
            </p>
            <p>
              The lecture was advertised in a single local publication, and only
              a small attendance was expected. Instead, more than 350 women
              came, including kallah teachers and educators. Following the
              lecture, Mrs. Touger was inundated with requests for additional
              talks and extended her stay in America for several days in order
              to accommodate them.
            </p>
            <p>
              It became clear that there was a significant need for a respectful
              and appropriate framework in which these topics could be
              addressed. From that realization, Ohel Miriam was established.
              Since then, Ohel Miriam has continued to grow, connecting
              thousands of individuals to education and resources that support
              shalom bayis and the building of a healthy Jewish home.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Image
            height={600}
            width={600}
            className="w-80 md:w-110 lg:w-130 object-cover mx-auto md:mx-0"
            src={ohelComes}
            alt="ohel"
          />
        </div>
      </section>
    </main>
  );
}
