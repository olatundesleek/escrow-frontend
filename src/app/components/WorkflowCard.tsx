"use client";

import Image from "next/image";
import Header from "./Header";
import Article from "./Article";

interface WorkflowCardProps {
  image: string;
  number: string;
  title: string;
  description: string;
  style?: string;
}
const WorkflowCard = ({
  image,
  number,
  description,
  title,
  style
}: WorkflowCardProps) => {

  

  return (
    <section className=" h-screen sticky top-0 transparent">
      <div className={`lg:flex m-3 gap-10 lg:w-[60rem] ${style} lg:p-10 p-5 items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-4xl w-full`}>
        <Image
          src={image}
          width="300"
          height="300"
          alt="Workflow Image"
          className="lg:border-r-1 p-7 border-gray-200"
        />
        <div className="flex flex-col gap-5  lg:w-[55%]">
          <h1 className="bg-secondary w-10 h-10 rounded-sm font-bold shadow-[5px_5px_0px_0px_hsl(35,85%,60%)] flex justify-center items-center text-2xl text-white">
            {number}
          </h1>
          <Header textSize="text-3xl">{title}</Header>
          <Article>{description}</Article>
        </div>
      </div>
    </section>
  );
};

export default WorkflowCard;
