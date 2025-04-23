import SectionalTitle from "./SectionalTitle";
import Button from "./Button";
import { FiArrowUpRight } from "react-icons/fi";

const Subscribe = () => {
  return (
    <section className="bg-[radial-gradient(circle_at_50%,_#000000,_#000000_50%,_#061207_75%,_#001204_75%)] mt-4 flex flex-col gap-6 justify-center items-center lg:p-30 p-20">
      <SectionalTitle
        title="SUBSCRIBE"
        description="Stay Informed and Connected by Subscribing to Our Newsletter"
        desSize="lg:text-3xl text-white"
      />

      <div className="lg:flex w-auto justify-center items-center block border-2 border-green-400">
        <input
          className="lg:w-[50rem] border-0 lg:m-5 m-2 rounded-md outline-secondary h-13 text-xl bg-white p-8"
          type="email"
          placeholder="Enter Your Email Address"
        />
        <Button
          color="bg-orange-400 hover:opacity-90 text-white"
          textSize="text-2xl"
          style="flex gap-3 items-center ml-20"
        >
          Subscribe
          <span>
            <FiArrowUpRight />
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Subscribe;
