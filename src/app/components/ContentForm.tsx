"use client";

import Image from "next/image";
import Button from "./Button";

import { FiArrowUpRight } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";

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
    <div className="flex flex-col gap-4 items-center justify-center border-2 lg:flex-row lg:gap-8 lg:justify-center ">
      <div className="relative lg:w-[450px] lg:h-[650px] md:w-[300px] md:h-[500px] sm:w-[150px] sm:h-[350px] rounded-xl overflow-hidden  ">
        <Image src="/group.png" alt="group" fill className="object-contains" />
      </div>

      <div className="flex flex-col gap-4 w-[50%] lg:items-end h-full rounded-xl bg-amber-200/30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[60%] flex flex-col gap-8  p-10 "
        >
          <div className="flex flex-col gap-2">
            <h1>
              Your Full Name <span className="text-red-500">*</span>
            </h1>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="border-1 border-gray-500  outline-secondary rounded-sm h-12 w-full"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <h1>
              Your Email <span>*</span>
            </h1>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className="border-1 border-gray-500  outline-secondary rounded-sm h-12 w-full"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <h1>
              Subject <span>*</span>
            </h1>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="border-1 border-gray-500  outline-secondary rounded-sm h-12 w-full"
            />
            {errors.subject && <p>{errors.subject.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <h1>
              Message <span>*</span>
            </h1>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="border-1 border-gray-500  outline-secondary rounded-sm h-20 w-full"
            />
            {errors.message && <p>{errors.message.message}</p>}
          </div>
          <Button
            color="bg-secondary hover:opacity-90 text-white"
            textSize="text-xl"
            style="flex gap-3  items-center  w-[14rem]"
            type="submit"
          >
            Send Message
            <span>
              <FiArrowUpRight />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContentForm;
