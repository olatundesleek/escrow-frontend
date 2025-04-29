"use client";

import Lists from "./Lists";
import { useState } from "react";
import Image from "next/image";
import Article from "./Article";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "./Button";

interface FAQ {
  question: string;
  answer: string;
}

const Accordian = ({ faqs }: { faqs: FAQ[] }) => {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-10 lg:gap-15  lg:py-20">
      <div className="flex flex-col-reverse lg:flex-row lg:gap-15 lg:justify-center lg:items-center m-3">
        <div>
          {faqs.map((faq, i) => (
            <Lists
              faq={faq}
              index={i}
              key={i}
              curOpen={curOpen}
              setCurOpen={setCurOpen}
            />
          ))}
        </div>
        <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] mx-auto lg:ml-0 lg:mr-0">
          <Image
            src="/qa.png"
            alt="qa"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 m-3 lg:pl-30 ">
        <Article>
          Have more questions? Click the button bellow to learn more.
        </Article>

        <Button
          color="bg-secondary hover:opacity-90 text-white"
          textSize="text-xl"
          style="flex gap-3 items-center justify-center w-[10rem]"
        >
          Ask More <FiArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default Accordian;
