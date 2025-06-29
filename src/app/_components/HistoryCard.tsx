"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HistoryCardProps {
  title: string;
  number: string; // e.g. "500+" or "10k+"
  image: string;
}

function parseNumber(numStr: string) {
  const match = numStr.match(/^(\d+)(k)?/i);
  if (!match) return 0;
  let num = parseInt(match[1], 10);
  if (match[2]) num *= 1000;
  return num;
}

const HistoryCard = ({ image, number, title }: HistoryCardProps) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const target = parseNumber(number);
    let observer: IntersectionObserver | null = null;

    if (ref.current && !hasAnimated) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const start = 0;
            const duration = 5000;
            const stepTime = Math.max(Math.floor(duration / target), 20);
            let current = start;

            const timer = setInterval(() => {
              current += Math.ceil(target / (duration / stepTime));
              if (current >= target) {
                setDisplay(target);
                clearInterval(timer);
              } else {
                setDisplay(current);
              }
            }, stepTime);

            setHasAnimated(true);
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
    // eslint-disable-next-line
  }, [number, hasAnimated]);

  // Add "+" or "k+" if present in original number
  let suffix = "";
  if (number.endsWith("k+")) suffix = "k+";
  else if (number.endsWith("+")) suffix = "+";

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 bg-white w-[18rem] md:w-[20rem] border border-secondary rounded-xl p-5 shadow hover:shadow-lg transition-all duration-200"
    >
      <div className="flex flex-col items-center">
        <Image
          src={image}
          alt={title}
          height={64}
          width={64}
          className="rounded-full border border-dashboard-border"
        />
        <div className="h-8 w-px bg-secondary mt-2" aria-hidden="true"></div>
      </div>
      <div className="flex flex-col justify-center pl-2">
        <h2 className="text-3xl md:text-4xl text-secondary font-bold pb-1">
          {display}
          {suffix}
        </h2>
        <p className="text-lg md:text-xl text-gray-600">{title}</p>
        <div
          className="h-1 w-10 bg-orange-400 rounded mt-2"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default HistoryCard;
