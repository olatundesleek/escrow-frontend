"use client";
import { useEffect, useRef, useState } from "react";
import { Card } from "./_slider/Card";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import * as motion from "motion/react-client";

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const cards = [0, 1, 2, 3, 4].map((index) => <Card key={index} />);

  // Use ResizeObserver for real-time width updates
  useEffect(() => {
    const updateCardWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    const observer = new ResizeObserver(updateCardWidth);
    if (cardRef.current) observer.observe(cardRef.current);

    updateCardWidth(); // Initial call

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-auto px-4 py-20 bg-primary text-center flex flex-col justify-center items-center mt-10 overflow-hidden">
      {/* Heading Section */}
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

      {/* Slider */}
      <section className="relative w-full overflow-hidden max-w-7xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * cardWidth}px)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={index === 0 ? cardRef : null}
              className="
                flex-shrink-0
                basis-[90%] 
                sm:basis-[80%] 
                md:basis-1/2 
                lg:basis-[40%] 
                xl:basis-[33%]
                flex justify-center items-center"
            >
              {card}
            </div>
          ))}
        </div>
      </section>

      {/* Arrows */}
      <div className="w-full mt-8 flex justify-center gap-10 text-4xl items-center">
        {[
          { Icon: <BsArrowLeft />, click: handlePrev },
          { Icon: <BsArrowRight />, click: handleNext },
        ].map(({ Icon, click }, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            onClick={click}
            className="rounded-full border p-2 w-14 h-14 text-white sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer"
          >
            {Icon}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
