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
            const duration = 1500;
            const stepTime = Math.max(Math.floor(duration / target), 12);
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
  }, [number, hasAnimated]);

  // Add "+" or "k+" if present in original number
  let suffix = "";
  if (number.endsWith("k+")) suffix = "k+";
  else if (number.endsWith("+")) suffix = "+";

  return (
    <div
      ref={ref}
      className="flex items-center gap-4 bg-white w-full max-w-sm border border-background rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-14 h-14 rounded-full border-4 border-accent bg-gradient-to-br from-accent/20 to-primary/10 shadow-inner group-hover:scale-110 transition-transform overflow-hidden flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-full"
            sizes="30px"
            priority
          />
        </div>
        <div
          className="h-10 w-px bg-accent mt-2 opacity-30"
          aria-hidden="true"
        ></div>
      </div>

      <div className="flex flex-col justify-center pl-2">
        <h2 className="text-3xl md:text-4xl text-secondary font-black pb-1 tracking-tight flex items-end">
          <span className="transition-colors duration-300 group-hover:text-accent drop-shadow">
            {display}
          </span>
          <span className="ml-1 text-2xl md:text-3xl text-accent">
            {suffix}
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 font-semibold">
          {title}
        </p>
        <div
          className="h-1 w-16 bg-gradient-to-r from-accent to-secondary rounded-full mt-4"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default HistoryCard;
