import HomeBannerSubtitle from "./HomeBannerSubtitle";
import { Typewriter } from "react-simple-typewriter";
import HomeBannerSubtitle from "./HomeBannerSubtitle";
import { Typewriter } from "react-simple-typewriter";

const HomeBannerTitle = () => {
  return (
    <div className="bg-transparent h-auto w-full">
      <div className="flex gap-4 px-4 py-2 items-center sm:px-6 md:px-8 lg:px-12 justify-center w-full lg:justify-start">
        <div className="w-4 h-12 sm:w-6 sm:h-16 md:w-8 md:h-20 lg:w-8 lg:h-28 rounded-2xl bg-yellow-500"></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-yellow-400 bg-clip-text text-transparent text-center lg:text-left">
    <div className="bg-transparent h-auto w-full">
      <div className="flex gap-4 px-4 py-2 items-center sm:px-6 md:px-8 lg:px-12 justify-center w-full lg:justify-start">
        <div className="w-4 h-12 sm:w-6 sm:h-16 md:w-8 md:h-20 lg:w-8 lg:h-28 rounded-2xl bg-yellow-500"></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-yellow-400 bg-clip-text text-transparent text-center lg:text-left">
          Your Financial Protector
        </h2>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold px-4 sm:px-6 md:px-8 lg:px-12 text-center lg:text-left">
        <Typewriter
          words={["Secure Payments", "Secure Payments"]}
          loop={1}
          typeSpeed={100}
          deleteSpeed={100}
          delaySpeed={100}
        />
        <HomeBannerSubtitle>
          <Typewriter
            words={["Simplified", "Simplified"]}
            loop={1}
            typeSpeed={100}
            deleteSpeed={100}
            delaySpeed={100}
          />
        </HomeBannerSubtitle>
      </h1>
    </div>
  );
};

export default HomeBannerTitle;
