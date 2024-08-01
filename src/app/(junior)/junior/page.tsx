"use client";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

function Page() {
  const start: Dayjs = dayjs("2024-03-11T00:00:00");
  const targetDate: Dayjs = start.add(40, "week");
  const now: Dayjs = dayjs();
  const ageWeek: number = dayjs().diff(start, "week");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.totalMilliseconds <= 0) {
        clearInterval(interval);
      }
    }, 100);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  function getTimeLeft(targetDate: Dayjs): TimeLeft {
    const now: Dayjs = dayjs();
    const difference: number = targetDate.diff(now);

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        totalMilliseconds: 0,
      };
    }

    const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds: number = Math.floor(difference % 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      totalMilliseconds: difference,
    };
  }

  // Define the type for the timeLeft state
  type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    totalMilliseconds: number;
  };

  function formatNumber(num: number, digits: number): string {
    return num.toString().padStart(digits, "0");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="h-screen absolute right-0 left-0 top-0 bottom-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: "url(/free-pregnant-silhouette-clip-art-1.png)",
        }}
      />
      <div>
        Junior Hein is Coming soon
        <div className="absolute opacity-10  text-4xl font-digit ">
          000:00:00:00:000
        </div>
        <div className=" blinking text-4xl font-digit ">
          {formatNumber(timeLeft.days, 3)}:{formatNumber(timeLeft.hours, 2)}:
          {formatNumber(timeLeft.minutes, 2)}:
          {formatNumber(timeLeft.seconds, 2)}:
          {formatNumber(timeLeft.milliseconds, 3)}
        </div>
        <div className=" opacity-40">{ageWeek} weeks</div>
      </div>
    </div>
  );
}

export default Page;
