// import { getCategories } from "@/actions/category";
import FadeInSection from "@/components/common/FadeInSection";
import SpeakerGrid from "@/components/speakers/SpeakerGrid";

import { BASE_URL } from "@/utils/envVariable";

export default async function Speakers() {
  const res = await fetch(BASE_URL + "/api/account/speakers");
  const { data: speakersData } = await res?.json();
  const speakers = speakersData?.map(
    (speaker: { firstName: string; lastName: string; _id: string; userName: string; avatar: string; courses: string[] }) => ({
      fullName: speaker?.firstName + " " + speaker?.lastName,
      _id: speaker._id,
      userName: speaker.userName,
      avatar: speaker.avatar,
      courses: speaker.courses,
    })
  );

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
            All Speakers
          </h1>
        </FadeInSection>
      </section>
      <section className="container min-h-screen">
        <SpeakerGrid speakers={speakers}/>
       {/* you can add pagination here when you want.. */}
      </section>
    </main>
  );
}
