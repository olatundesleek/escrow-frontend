import HomeBannerSubtitle from "./HomeBannerSubtitle";
import { Typewriter } from "react-simple-typewriter";

const HomeBannerTitle = () => {
  return (
    <div className="bg-transparent h-auto w-full">
      <div className="flex gap-4 items-center justify-center w-full lg:justify-start">
        <div className="w-4 h-12 sm:w-6 sm:h-16 md:w-8 md:h-20 lg:w-8 lg:h-28 rounded-2xl bg-accent"></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent text-center lg:text-left">
          Your Financial Protector
        </h2>
      </div>

      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-secondary font-bold text-center lg:text-left">
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
      </div>
    </div>
  );
};

export default HomeBannerTitle;
