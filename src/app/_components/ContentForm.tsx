"use client";

import Image from "next/image";
import Button from "./Button";
import FormFormat from "./FormFormat";
import { FiArrowUpRight } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaHouseUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted", data);
  };

  return (
    <div className="relative flex flex-col gap-70 m-4 lg:flex-row lg:gap-20 lg:items-center lg:justify-center">
      {/* Middle Absolute Component */}
      <div className="bg-green-900 text-white   rounded-xl shadow-lg lg:w-[400px] w-full  absolute lg:left-9/20 left-1/2 lg:top-1/2 top-3/10 transform -translate-x-1/2 -translate-y-1/2 z-10 border-1 border-white flex items-center  justify-center ">
        <div className="flex w-full p-10 flex-col gap-7">
          <FormFormat
            title="Address"
            format="Ojo Ayo Street, Lagos State, Nigeria"
          >
            <FaHouseUser />
          </FormFormat>

          <FormFormat title="Email Address" format="example@example.com">
            <MdEmail />
          </FormFormat>

          <FormFormat title="Phone" format="0123-456-789">
            <FaPhone />
          </FormFormat>
        </div>
      </div>

      {/* Left: Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:w-[400px] lg:h-[600px] rounded-xl overflow-hidden">
        <Image src="/group.png" alt="group" fill className="object-cover" />
      </div>

      {/* Right: Form */}
      <div className="flex flex-col w-full lg:pl-[13rem] pt-10 lg:w-[600px] h-full p-6 border-1 border-gray-500 rounded-xl shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col py-4 gap-6"
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label>
              Your Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border border-gray-400 bg-amber-200/30 outline-secondary rounded h-12 px-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label>
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-400 bg-amber-200/30 outline-secondary rounded h-12 px-3"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label>
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="border border-gray-400 bg-amber-200/30 outline-secondary rounded h-12 px-3"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label>
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="border border-gray-400 bg-amber-200/30 outline-secondary rounded h-28 px-3 py-2"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <Button
            color="bg-secondary hover:opacity-90 text-white"
            textSize="text-xl"
            style="flex gap-3 items-center w-fit"
            type="submit"
          >
            Send Message <FiArrowUpRight />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContentForm;
