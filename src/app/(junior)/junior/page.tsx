"use client";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

function Page() {
  const start: Dayjs = dayjs("2024-03-11T00:00:00");
  const targetDate: Dayjs = start.add(3, "week");

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
      <div className="h-screen absolute right-0 left-0 top-0 bottom-0 opacity-20 bg-cover bg-center" style={{backgroundImage:"url(/free-pregnant-silhouette-clip-art-1.png)"}}/>
      <div>
        Junior Hein is Coming soon
        <div className=" font-mono blinking text-2xl">
          {formatNumber(timeLeft.days * -1, 3)}:
          {formatNumber(timeLeft.hours * -1, 2)}:
          {formatNumber(timeLeft.minutes * -1, 2)}:
          {formatNumber(timeLeft.seconds * -1, 2)}:
          {formatNumber(timeLeft.milliseconds * -1, 3)}
        </div>
        :)
      </div>
    </div>
  );
}

export default Page;
