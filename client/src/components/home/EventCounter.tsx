"use client";

import { ReactNode } from "react";
import Countdown from "react-countdown";

interface EventCounterProps {
  targetDate: string | Date;
}

export default function EventCounter({ targetDate }: EventCounterProps) {
  const renderer = ({
    days,
    hours,
    minutes,
    completed,
  }: {
    days: ReactNode;
    hours: ReactNode;
    minutes: ReactNode;
    seconds: ReactNode;
    completed: boolean;
  }) => {
    if (completed) {
      return (
        <span className="text-[#270034] font-medium text-sm md:text-base">
          Event Started
        </span>
      );
    }

    return (
      <div className="flex gap-x-2 justify-center sm:justify-start">
        <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
          <p className="font-medium md:text-lg lg:text-xl text-xl">{days}</p>
          <p className="font-medium md:text-md lg:text-lg text-lg -mt-1 capitalize">
            day
          </p>
        </div>
        <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
          <p className="font-medium md:text-lg lg:text-xl text-xl">{hours}</p>
          <p className="font-medium md:text-md lg:text-lg text-lg -mt-1 capitalize">
            Hours
          </p>
        </div>
        <div className="py-1 md:px-2 lg:px-3 px-4 bg-white rounded-2xl items-center justify-center flex flex-col">
          <p className="font-medium md:text-lg lg:text-xl text-xl">{minutes}</p>
          <p className="font-medium md:text-md lg:text-lg text-lg -mt-1 capitalize">
            Minutes
          </p>
        </div>
      </div>
    );
  };

  return <Countdown date={new Date(targetDate)} renderer={renderer} />;
}