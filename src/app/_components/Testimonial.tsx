"use client";

import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { TestimonialData } from "../_constants/Testimonial";
import Card from "./Card";
import SectionalTitle from "./SectionalTitle";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Settings, SliderMethods } from "react-slick";
import Slider from "react-slick";

export const Testimonial = () => {
  const sliderRef = useRef<SliderMethods | null>(null);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const nextSlide = () => sliderRef.current?.slickNext();
  const prevSlide = () => sliderRef.current?.slickPrev();

  return (
    <section
      className="w-full flex flex-col items-center justify-center lg:py-10 py-4 text-center overflow-hidden bg-secondary"
      role="region"
      aria-labelledby="testimonial-title"
    >
      <motion.section
        className="w-full max-w-6xl mb-10"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionalTitle
          title="FEEDBACK"
          desSize="text-2xl text-primary"
          description="Sharing Valuable Insights and Meaningful Experiences for Growth"
        />
      </motion.section>

      <div
        className="relative w-full px-2 xl:px-32 py-6 bg-gradient-to-br rounded-2xl"
        aria-label="Customer Testimonials"
        aria-live="polite"
      >
        <Slider ref={sliderRef} {...settings}>
          {TestimonialData.map(
            ({ image, remark, clientname, profession }, index) => (
              <div
                key={index}
                className="px-2 xl:h-90 min-h-[20rem] flex items-center"
              >
                <Card
                  profession={profession}
                  image={image}
                  remark={remark}
                  clientname={clientname}
                />
              </div>
            )
          )}
        </Slider>
      </div>

      <nav
        className="w-full mt-5 flex justify-center gap-10 text-3xl items-center"
        aria-label="Testimonial navigation"
      >
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#e3f2fd" }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          aria-label="Previous testimonial"
          className="rounded-full border border-primary p-2 w-12 h-12 text-accent flex items-center justify-center shadow hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent transition"
        >
          <BsArrowLeft />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#e3f2fd" }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          aria-label="Next testimonial"
          className="rounded-full border border-primary p-2 w-12 h-12 text-accent flex items-center justify-center shadow hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent transition"
        >
          <BsArrowRight />
        </motion.button>
      </nav>
    </section>
  );
};
