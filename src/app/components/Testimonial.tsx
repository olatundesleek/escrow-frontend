'use client';

import { useState, useEffect } from 'react';
import { Card } from './Card';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion'; // Fix your import here
import { TestimonialData } from '../constants/Testimonial';
import SectionalTitle from './SectionalTitle';
import PageBanner from './PageBanner';

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === TestimonialData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TestimonialData.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const slide = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(slide);
  }, []);

  return (
    <PageBanner>
      <div className='w-full text-center flex flex-col justify-center items-center overflow-hidden'>
        <motion.section
          className='w-full max-w-6xl mb-10'
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionalTitle
            title={'FEEDBACK'}
            desSize={'text-2xl text-white'}
            description={
              'Sharing Valuable Insights and Meaningful Experiences for Growth'
            }
          />
        </motion.section>

        {/* Snap Scroll Slider */}
        <section className='relative w-full max-w-7xl overflow-hidden'>
          <div className='relative w-full h-[300px] overflow-hidden justify-center items-center'>
            <motion.div
              className='flex h-full md:w-[70%] w-[98%] gap-2 xl:gap-10 lg:gap-5 lg:w-[45%] md:gap-5'
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ ease: 'easeInOut', duration: 1 }}
            >
              {TestimonialData.map(({ image, remark, clientname }, index) => (
                <div
                  key={index}
                  className='flex-shrink-0 w-full sm:w-full md:w-full lg:w-full xl:w-[90%] h-full'
                >
                  <Card image={image} remark={remark} clientname={clientname} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Arrows */}
        <div className='w-full m-5 flex justify-center gap-10 text-4xl items-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className='rounded-full border p-2 w-14 h-14 text-white flex items-center justify-center cursor-pointer'
          >
            <BsArrowLeft />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className='rounded-full border p-2 w-14 h-14 text-white flex items-center justify-center cursor-pointer'
          >
            <BsArrowRight />
          </motion.button>
        </div>
      </div>
    </PageBanner>
  );
};
