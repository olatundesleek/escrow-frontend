"use client";
import { useRef } from "react";
import { Card } from "./_slider/Card";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import * as motion from "motion/react-client";

export const Testimonial = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      containerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-auto px-2 py-20 bg-primary text-center flex flex-col justify-center items-center mt-10 overflow-hidden">
      {/* Heading */}
      <motion.section
        className="w-full max-w-6xl mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold outline-text">
          FEEDBACK
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mt-5">
          Sharing Valuable Insights and Meaningful Experiences for Growth
        </h2>
      </motion.section>

      {/* Snap Scroll Slider */}
      <section className="relative w-full max-w-7xl overflow-hidden">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory px-2 hide-scrollbar"
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[90%] sm:w-[80%] md:w-1/2 lg:w-[40%] xl:w-[40%] snap-center h-full"
            >
              <Card />
            </div>
          ))}
        </div>
      </section>
 
      {/* Arrows */}
      <div className="w-full mt-8 flex justify-center gap-10 text-4xl items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll("left")}
          className="rounded-full border p-2 w-14 h-14 text-white flex items-center justify-center cursor-pointer"
        >
          <BsArrowLeft />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll("right")}
          className="rounded-full border p-2 w-14 h-14 text-white flex items-center justify-center cursor-pointer"
        >
          <BsArrowRight />
        </motion.button>
      </div>
    </div>
  );
};
