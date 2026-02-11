"use client";
import ScrollArea from "@/components/common/ScrollArea";
import { PaidHotlineSpeakerType } from "@/types/PaidHotlineSpeaker";
import { getImageUrl } from "@/utils/getImageUrl";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpeakerGallerySlider({
  speakers,
}: {
  speakers: PaidHotlineSpeakerType[];
}) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(speakers[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * speakers.length);
      setSelectedSpeaker(speakers[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [speakers]);
  return (
    <section>
      <h1 className="font-extrabold text-3xl lg:text-4xl text-center h-60 flex items-center justify-center uppercase">
        OUR SPEAKERS
      </h1>

      <div className="bg-black min-h-[35rem] py-10 sm:px-10">
        <ScrollArea>
          <div className="flex gap-10 sm:gap-20 justify-center flex-nowrap py-2 w-full">
            {speakers
              .slice(0, Math.floor(speakers.length / 2))
              .map((speaker) => (
                <div
                  className="shrink-0"
                  key={speaker._id}
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <Image
                    src={getImageUrl(speaker.avatar, "profile")}
                    alt={speaker.fullname}
                    width={80}
                    height={80}
                    className="size-20 rounded-full object-cover cursor-pointer hover:scale-105 transition border hover:border-2 border-white"
                  />
                </div>
              ))}
          </div>
        </ScrollArea>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 justify-center items-center my-10 sm:my-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpeaker._id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={getImageUrl(selectedSpeaker.avatar, "profile")}
                alt={selectedSpeaker.fullname}
                width={250}
                height={250}
                className="size-35 sm:size-64 rounded-full object-cover border-2"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpeaker._id + "-info"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 max-w-xl text-center sm:text-left"
            >
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white text-3xl sm:text-4xl lg:text-5xl font-medium"
              >
                {selectedSpeaker.fullname}
              </motion.h3>

              <motion.h5
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-200 text-xl sm:text-2xl"
              >
                {selectedSpeaker.speciality}
              </motion.h5>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-100 text-xl"
                dangerouslySetInnerHTML={{
                  __html: selectedSpeaker.description,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <ScrollArea>
          <div className="flex gap-10 sm:gap-20 justify-center flex-nowrap py-2 w-full">
            {speakers
              .slice(Math.floor(speakers.length / 2), speakers.length)
              .map((speaker) => (
                <div
                  key={speaker._id}
                  className="shrink-0"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <Image
                    src={getImageUrl(speaker.avatar, "profile")}
                    alt={speaker.fullname}
                    width={80}
                    height={80}
                    className="size-20 rounded-full object-cover cursor-pointer hover:scale-105 transition border hover:border-2 border-white"
                  />
                </div>
              ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
