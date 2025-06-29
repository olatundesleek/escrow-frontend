import Image from "next/image";
import * as motion from "motion/react-client";
import { TestimonialType } from "@/app/_constants/Testimonial";

export default function Card({
  remark,
  clientname,
  profession,
  image,
}: TestimonialType) {
  return (
    <motion.figure
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="
        backdrop-blur-xl border border-secondary bg-white dark:border-white/10
        rounded-xl p-6 shadow-md hover:shadow-lg hover:border-accent transition-all duration-300
        flex flex-col justify-between h-full
      "
      role="figure"
      aria-label={`Testimonial from ${clientname}, ${profession}`}
    >
      {/* Accent Bar */}
      <div className="h-1 w-16 bg-accent rounded mb-4" aria-hidden="true"></div>

      {/* Remark */}
      <blockquote className="text-sm text-secondary italic leading-relaxed mb-6 line-clamp-5">
        “{remark}”
      </blockquote>

      {/* Footer */}
      <figcaption className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-secondary">
          <Image
            src={image}
            alt={`${clientname}'s photo`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-base font-semibold text-secondary">{clientname}</p>
          <p className="text-xs text-gray-500">{profession}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
