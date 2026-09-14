"use client";
import Link from "next/link";
import FadeInSection from "../common/FadeInSection";
import EventCounter from "./EventCounter";
import { useEffect, useState } from "react";
import { IConference } from "@/types/conference";
import { BASE_URL } from "@/utils/envVariable";

const Upcoming = () => {
  const [conferences, setConferences] = useState<IConference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const res = await fetch(BASE_URL + "/api/home/conference/");
        const data = await res.json();
        if (data.success) {
          setConferences(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch conferences', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);
  return (
    <section className="mt-20">
     <div className="container">
      <FadeInSection
        initial={{ opacity: 0, y: 50 }}
        scrollTop={{ opacity: 1, y: 0 }}
        scrollBottom={{ opacity: 0, y: 50 }}
        margin="40px 0px -40px 0px"
        delay={0.5}
      > 
        <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          {" "}
          Upcoming conferences
        </h3>
      </FadeInSection>
     </div>
     <div className="bg-ligtGray py-14">
        <div className="container">

          {loading ? (
            <p>Loading conferences...</p>
          ) : conferences.length > 0 ? (
            conferences.map((event, index) => (
              <div key={index} className="flex md:flex-row flex-col border-b-2 border-gray-300">

            {/* date */}
            <div className="flex sm:flex-row flex-col gap-x-6 items-center h-fit md:py-6 sm:pr-10 ">
              <div className="flex flex-col gap-y-2 sm:h-full sm:justify-between items-center sm:items-start">
                <p className="text-[#270034] lg:text-xl md:text-lg text-xl font-semibold">{event.month}</p>
                <h3 className="text-[#270034] md:text-5xl lg:text-6xl text-6xl font-bold">{event.day}</h3>
              </div>
              <div className="flex flex-col items-center sm:items-start ">
                <p className="text-[#270034] md:text-md lg:text-lg text-lg font-medium mb-2">{event.timeInfo}</p>
                <EventCounter targetDate={event.eventDate} />
              </div>
            </div>

            <div className="flex justify-between w-full items-center">
              {/* info */}
              <div className="py-5">
                <div className="md:border-l-2 md:border-gray-300 h-full md:px-5 flex flex-col justify-center">
                  <h3 className="lg:text-3xl text-lg sm:text-xl text-[#270034] lg:font-semibold md:font-medium font-semibold">Speaker: <span className="text-[#0F75BC]">{event.speaker}</span></h3>
                  <h3 className="lg:mt-3 md:mt-2 lg:text-3xl text-lg sm:text-xl text-[#270034] lg:font-semibold md:font-medium font-semibold">Lecture: <span className="text-[#0F75BC]">{event.lecture}</span></h3>
                </div>
              </div>
              
              {/* button */}
              <Link href={event.readMoreUrl || "#"}>
                <button className="bg-[#270034] sm:px-5 px-3 py-2 flex items-center justify-center sm:h-9 h-8 border-2 border-[#0F75BC] rounded-full font-medium text-white text-[13px] sm:text-sm text-nowrap shadow-[2px_2px_20px_0px_#2700346c] hover:bg-[#0F75BC] transition-all duration-150">Read More</button>
              </Link>
            </div>
          </div>
            ))
          ) : (
            <p>No upcoming conferences found.</p>
          )}

        </div>
     </div>
    </section>
  );
}

export default Upcoming;