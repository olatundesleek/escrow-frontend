import Image from "next/image";
import * as motion from "motion/react-client";
import { TestimonialType } from "@/app/constants/Testimonial";

export const Card = ({ image, remark, clientname }: TestimonialType) => {
  return (
    <motion.section
      className="w-full h-full bg-amber-100 rounded-2xl xl:text-xl flex justify-evenly items-center flex-col p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-800 leading-relaxed"
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
            className="w-full h-full rounded-full border-4 border-amber-700"
          />
        </div>
        <div className="info flex justify-center items-start flex-col">
          <h2 className="name text-xl xl:text-3xl text-amber-700 font-bold">
            {clientname}
          </h2>
          <p className="profession text-gray-600">Businessman</p>
        </div>
      </motion.div>
    </motion.section>
  );
};
