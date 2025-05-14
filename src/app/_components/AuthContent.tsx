"use client";

import Image, { StaticImageData } from "next/image";
import { FaHome } from "react-icons/fa";
import * as m from "motion/react-client";
import Logo from "./Logo";

interface AuthContentProps {
  authPageName: string;
  aboutAuthPage: string;
  handleSubmit?: (e: React.FormEvent) => Promise<void>;
  children?: React.ReactNode;
  formContent?: React.ReactNode;
  formBanner: StaticImageData;
}
export default function AuthContent({
  authPageName,
  aboutAuthPage,
  handleSubmit,
  formContent,
  children,
  formBanner,
}: AuthContentProps) {
  return (
    <div className="w-full h-auto custom-gradient p-2 flex md:justify-start justify-center items-center text-lg">
      <div className="w-full flex justify-start items-center">
        <div className="md:w-[45%] min-h-[100vh] w-full flex flex-col items-center p-2 lg:mx-7 h-auto py-10 gap-5">
          <header className="flex justify-between items-center w-full py-5">
            <Logo />
            <m.a
              href="/"
              className="p-2 rounded-full bg-white border border-#7ccf00 text-[#7ccf00]"
              whileHover={{
                scale: 1.06,
                backgroundColor: "#7ccf00",
                color: "#f90",
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FaHome size={20} />
            </m.a>
          </header>

          <h2 className="xl:text-4xl text-2xl font-bold text-[#7ccf00] tracking-wide">
            {authPageName}
          </h2>
          <p className="mt-2 text-xl text-center">{aboutAuthPage}</p>

          {children ? (
            children
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full pt-5 my-10 xl:px-20 flex flex-col justify-center items-center border-t border-gray-300"
            >
              {formContent}
            </form>
          )}
        </div>

        <div
          className="w-1/2 h-[97vh] hidden md:flex justify-center items-center rounded-xl fixed top-[10px] right-[10px]"
          style={{
            background:
              "linear-gradient(58deg, #aeebae70, #f1b36679, #aeebae70)",
          }}
        >
          <Image src={formBanner} alt="login" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
}
