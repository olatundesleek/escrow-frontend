import Image from "next/image";
import * as motion from "motion/react-client";
import { TestimonialType } from '@/app/_constants/Testimonial';

export const Card = ({
  image,
  remark,
  clientname,
  profession,
}: TestimonialType) => {
  return (
    <motion.section
      className="w-full max-w-[500px] h-full rounded-2xl text-lg xl:text-xl flex justify-center items-center flex-col p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-amber-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center text-primary leading-relaxed"
      >
        {remark}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center w-full h-auto p-2 gap-5"
      >
        <div className="image w-20 h-20">
          <Image
            src={image}
            alt="profile_image"
            className="w-full h-full rounded-full border-4 border-primary  bg-primary"
          />
        </div>
        <div className="info flex justify-center items-start flex-col">
          <h2 className="name text-xl xl:text-3xl text-orange-500 font-bold">
            {clientname}
          </h2>
          <p className="profession text-primary">{profession}</p>
        </div>
      </motion.div>
    </motion.section>
  );
};
