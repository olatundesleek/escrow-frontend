"use client";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import loginBanner from "./../../../public/loginimage.png";
import * as m from "motion/react-client";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Button from "./Button";
import Logo from "./Logo";

export default function Login() {
  const [isVisible, setIsvisible] = useState(true);
  const Icon = isVisible ? FaEye : FaEyeSlash;
  return (
    <div className="w-full h-[100vh] custom-gradient p-2 flex justify-center items-center text-center">
      <div className="w-full h-full flex justify-center items-center">
        <div className="md:w-1/2 w-[90%] h-full flex items-center flex-col p-2 lg:mx-10">
          <header className="flex justify-between items-center w-full py-10">
            <Logo />
            <m.a
              href="/"
              className="p-2 rounded-full bg-white border-1 border-secondary cursor-pointer text-secondary"
              whileHover={{
                color: "#f90",
                background: "#9af039",
                scale: 1.06,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                stiffness: "500",
              }}
            >
              <FaHome size={20} />
            </m.a>
          </header>
          <h2 className="xl:text-4xl text-2xl font-bold text-secondary">
            Login
          </h2>
          <p className="mt-2 text-xl">
            Secure your transactions effortlessly. Log in now and experience
            peace of mind with our trusted platform!
          </p>

          <form className="w-full h-auto pt-10 lg:px-15 my-10 lg:mx-5 flex flex-col justify-center items-center border border-transparent border-t-gray-300">
            <div className="w-full">
              <label className="w-full flex justify-start pt-4 font-medium">
                Username or Email Address
                <span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="text"
                className="form_input w-full p-4 border border-gray-300 rounded-sm"
              />
            </div>
            <div className="w-full">
              <label className="w-full flex justify-start pt-4 font-medium">
                Password <span className="text-red-500 pl-1">*</span>
              </label>
              <div className="relative w-full flex items-center">
                <input
                  type={isVisible ? "password" : "text"}
                  className="form_input w-full p-4 pr-15 border border-gray-300 rounded-sm sm:bg-blue-200"
                />
                <m.div
                  whileHover={{ scale: 1.05, cursor: "pointer" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    stiffness: "500",
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  style={{ position: "absolute", right: "5%", top: "35%" }}
                >
                  <Icon
                    onClick={() => setIsvisible(!isVisible)}
                    style={{
                      position: "relative",
                      color: "gray",
                      fontSize: "1.5em",
                      cursor: "pointer",
                    }}
                  />
                </m.div>
              </div>
            </div>
            <div className="flex w-full justify-between items-center py-4">
              <label className="font-medium flex justify-center items-center py-2">
                <input
                  type="checkbox"
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "2px",
                    cursor: "pointer",
                  }}
                />
                Remember me
              </label>
              <Link href={"#"}>Forgotten Password?</Link>
            </div>
            <Button color="bg-secondary text-white font-medium w-full">
              Log In
            </Button>
          </form>
        </div>
        <div
          className="w-1/2 h-full md:flex hidden justify-center items-center rounded-xl"
          style={{
            background:
              "linear-gradient(58deg, #aeebae70, #f1b36679, #aeebae70)",
          }}
        >
          <Image src={loginBanner} alt="login" className="w-[80%]" />
        </div>
      </div>
    </div>
  );
}
