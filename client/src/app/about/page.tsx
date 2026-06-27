import FadeInSection from "@/components/common/FadeInSection";
import { Icon } from "@iconify/react";

const features = [
  {
    id: 1,
    title: "A kallah may feel overwhelmed and unsure what is normal.",
    icon: "simple-line-icons:user-female",
  },
  {
    id: 2,
    title: "A wife of many years may quietly feel alone.",
    icon: "streamline-plump:toilet-sign-man-solid",
  },
  {
    id: 3,
    title: "Conversations that begin well often end in hurt feelings.",
    icon: "mdi:message-bubble",
  },
  {
    id: 4,
    title: "Some questions feel too personal or embarrassing to ask.",
    icon: "healthicons:surveilance-officer-outline-24px",
  },
  {
    id: 5,
    title:
      "A husband may be struggling with questions he has never felt able to ask.",
    icon: "si:book-line",
  },
];
const services = [
  {
    id: 1,
    title: "Recordings & Calls",
    description:
      "Hear experienced educators address real-life situations and questions that are rarely discussed openly.",
    icon: "bx:headphone",
  },
  {
    id: 2,
    title: "Courses & Lectures",
    description:
      "Structured courses and lecture series that present practical guidance and hashkafas haTorah on building a peaceful and respectful home.",
    icon: "game-icons:bookshelf",
  },
  {
    id: 3,
    title: "Resources & Blog",
    description:
      "Explore articles and resources. Listen and participate at your own pace, gaining clarity. chizuk, and a healthier perspective on the challenges of marriage.",
    icon: "streamline-ultimate:paper-write-bold",
  },
];
const howToCome = [
  {
    id: 1,
    title: "The Call",
    description:
      "In 2014, an anonymous phone call was made to Mrs. Malka Touger from Eretz Yisroel, asking her to present a lecture for women on shalom bayis and marital harmony. Mrs. Touger, a teacher and international lecturer, agreed to speak.",
    icon: "ic:round-call",
  },
  {
    id: 2,
    title: "The First Lecture",
    description:
      "The lecture was advertised in a single local publication, and only a small attendance was expected. Instead, more than 350 women came, including kallah teachers and educators. Following the lecture, Mrs. Touger was inundated with requests for additional talks and extended her stay in America for several days to accommodate them.",
    icon: "raphael:people",
  },
  {
    id: 3,
    title: "The Realization",
    description:
      "It became clear that there was a significant need for a respectful and appropriate framework in which these topics could be addressed. From that realization, Ohel Miriam was established.",
    icon: "tabler:bulb-filled",
  },
  {
    id: 4,
    title: "The Growth",
    description:
      "Since then, Ohel Miriam has continued to grow, connecting thousands of individuals to education and resources that support shalom bayis and the building of a healthy Jewish home.",
    icon: "grommet-icons:grow",
  },
];
export default function About() {
  return (
    <main className="bg-orange-light">
      <section className="bg-[linear-gradient(rgba(0,120,200,0.4),rgba(0,120,200,0.4)),url('/images/volunteer/backlit-bird-clouds-755385.png')] bg-cover bg-center h-[200px] w-full grid place-items-center">
        <FadeInSection
          initial={{ opacity: 0, y: -50 }}
          scrollTop={{ opacity: 1, y: 0 }}
          scrollBottom={{ opacity: 0, y: -50 }}
          margin="40px 0px -40px 0px"
        >
          <h1 className="text-white font-extrabold text-3xl lg:text-4xl text-center">
            About Us
          </h1>
        </FadeInSection>
      </section>
      <section className="bg-[url('/images/about/about-page.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/15 min-h-200 flex items-center mt-10">
        <div className="container h-full">
          <div className="pt-10 max-w-155 z-1 relative before:absolute before:top-0 before:-left-40 before:-z-1 before:w-full  sm:before:w-200 before:h-100 before:blur-[50px] ">
            <h1 className="text-3xl font-playfair-display sm:text-4xl lg:text-5xl text-purple-cs font-bold">
              Sometimes Everything Looks Right..
            </h1>
            <p className="text-violet-cs font-bold text-2xl mt-4 mb-6 font-lora italic">
              and still something in the marriage feels painful or distant.
            </p>
            <p className="text-xl text-purple-cs font-lora">
              Ohel Miriam was created to address those moments with clarity,
              support, and Torah guidance.
            </p>
            <div className="border-b-2 border-violet-cs my-6 relative w-full max-w-142">
              <span className="text-4xl text-violet-cs absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-light rounded-full px-1 py-0.5 inline-block w-fit h-fit">
                <Icon icon="mdi:heart" className="size-7 " />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="container -mt-20">
        <div className="max-w-200">
          <div className="w-fit ">
            <h2 className="text-2xl font-playfair-display font-semibold mb-4 text-violet-cs ">
              ABOUT OHEL MIRIAM
            </h2>
            <div className="border-b-2 border-violet-cs my-6 relative w-full max-w-142">
              <span className="text-4xl text-violet-cs absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-light rounded-full px-1 py-0.5 inline-block w-fit h-fit">
                <Icon icon="mdi:heart" className="size-7 " />
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-4 font-lora">
            Founded in 2014, Ohel Miriam is a Torah-based educational
            organization dedicated to strengthening shalom bayis, intimacy, and
            family harmony through courses, recordings, lectures, and practical
            resources.
          </p>
          <p className="text-lg text-violet-cs font-lora font-bold">
            Thousands of individuals and families have benefited from Ohel
            Miriam&apos;s compassionate and practical approach to building stronger
            Jewish homes.
          </p>
        </div>
      </section>
      <section className=" pt-10 sm:pt-16 lg:pt-20">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#270034] font-bold mb-10 font-playfair-display">
            You Might Relate If...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4 bg-violet-cs size-15 flex items-center justify-center p-2 rounded-full text-white">
                  <Icon icon={feature.icon} width="32" height="32" />
                </div>
                <h3 className="font-medium mb-2 font-lora">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container pt-10 sm:pt-16 lg:pt-20">
        <div className="flex flex-col lg:flex-row gap-20">
          <div>
            <div className="w-fit ml-20">
              <h2 className="text-2xl font-semibold mb-4 font-playfair-display">
                How We Help
              </h2>
              <div className="border-b-2 border-purple-cs/20 my-5 relative w-full">
                <span className="text-4xl text-purple-cs/20 absolute top-1/2 left-1/2  -translate-1/2 bg-orange-light rounded-full px-1 py-0.5 inline-block w-fit h-fit">
                  <Icon icon="mdi:heart" className="size-5 " />
                </span>
              </div>
            </div>

            <div>
              {services.map((service) => (
                <div key={service.id} className="mb-6 flex items-start gap-4">
                  <div className="text-4xl mb-4 bg-violet-cs size-16 flex items-center justify-center p-2 rounded-full text-white ">
                    <Icon icon={service.icon} width="34" height="34" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 font-playfair-display">
                      {service.title}
                    </h3>
                    <p className="font-lora">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-slate-800 text-white p-10 rounded-lg w-full">
            <div className="w-fit ">
              <h2 className="text-2xl font-semibold mb-4 font-playfair-display">
                Our Mission
              </h2>
              <div className="border-b-2 border-white/20 my-5 relative w-full">
                <span className="text-4xl text-white/40 absolute top-1/2 left-1/2 transform -translate-1/2 bg-slate-800 rounded-full px-1 py-0.5 inline-block w-fit h-fit">
                  <Icon icon="mdi:heart" className="size-5 " />
                </span>
              </div>
            </div>
            <p className="max-w-[400px] font-lora">
              Our mission is to strengthen shalom bayis and kedushas habayis
              according to hashkafas haTorah and making it accessible and
              approachable for both women and men. <br /> <br /> Through
              lectures, recordings, courses, and resources, Ohel Miriam offers
              clarity, awareness, and chizuk in areas of marriage that are often
              difficult to address openly- yet deeply affect a Yiddishe home.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-violet-cs py-3 mt-10 sm:mt-16 lg:mt-20">
        <div className="container text-white pl-14 flex flex-col gap-8 md:flex-row md:items-center justify-between">
          <div className="flex items-center gap-4 ">
            <div className="bg-white text-violet-cs flex items-center justify-center p-3 rounded-full">
              <Icon icon="ic:outline-mail" width="32" height="32" />
            </div>
            <p className="text-white/90 font-lora">
              You don&apos;t have to navigate it alone. <br /> We&apos;re here to support,
              guide, and strengthen.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white text-violet-cs hover:bg-white/50 hover:text-white py-2 px-4 rounded-lg text-sm font-medium w-fit font-lora">
            Get Started Today
            <Icon
              icon="material-symbols:arrow-right-alt"
              width="24"
              height="24"
              className="mr-2"
            />
          </button>
        </div>
      </section>
      <section className="container py-10 sm:py-16 lg:py-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#270034] font-bold mb-10 text-center font-playfair-display">
          How Ohel Miriam Came to Be
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:border-t-2 border-violet-cs md:mt-20">
          {howToCome.map((item) => (
            <div
              key={item.id}
              className="text-center flex flex-col items-center relative pt-4 md:pt-16"
            >
              <div className="text-4xl mb-4 bg-violet-cs/20 size-15 flex items-center justify-center p-2 rounded-full text-violet-cs">
                <Icon icon={item.icon} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-cs font-playfair-display">
                {item.title}
              </h3>
              <p className="text-purple-cs font-lora">{item.description}</p>
              <span className="hidden md:flex absolute -top-4 left-1/2 transform -translate-x-1/2 bg-violet-cs text-white rounded-full w-8 h-8  items-center justify-center">
                {item.id}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
