"use client";

import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { TestimonialData } from "../constants/Testimonial";
import { Card } from "./Card";
import SectionalTitle from "./SectionalTitle";
import PageBanner from "./PageBanner";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamically import the Slider with SSR disabled
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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <PageBanner>
      <div className="w-full flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.section
          className="w-full max-w-6xl mb-10"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionalTitle
            title="FEEDBACK"
            desSize="text-2xl text-white"
            description="Sharing Valuable Insights and Meaningful Experiences for Growth"
          />
        </motion.section>

        <section
          className="relative w-full max-w-7xl px-2"
          aria-label="Customer Testimonials"
        >
          <Slider ref={sliderRef} {...settings}>
            {TestimonialData.map(
              ({ image, remark, clientname, profession }, index) => (
                <div key={index} className="px-2 xl:h-90 h-80">
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
        </section>

        <div className="w-full mt-5 flex justify-center gap-10 text-3xl items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="rounded-full border p-2 w-12 h-12 text-white flex items-center justify-center"
          >
            <BsArrowLeft />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="rounded-full border p-2 w-12 h-12 text-white flex items-center justify-center"
          >
            <BsArrowRight />
          </motion.button>
        </div>
      </div>
    </PageBanner>
  );
};
