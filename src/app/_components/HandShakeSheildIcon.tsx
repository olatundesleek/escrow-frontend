import { FaHandshake } from "react-icons/fa";
import { TbShield } from "react-icons/tb";

export function HandShakeShieldIcon() {
  return (
    <>
      {/* Modernized Center Icon */}
      <div className="relative flex items-center justify-center my-8 lg:my-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]">
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center w-72 h-72 lg:w-[360px] lg:h-[360px] rounded-full">
          {/* Shield (as background frame) */}
          <TbShield
            className="text-[240px] lg:text-[300px] text-secondary opacity-15 absolute"
            aria-hidden="true"
          />
          {/* Handshake inside shield */}
          <FaHandshake
            className="text-[96px] lg:text-[120px] text-accent drop-shadow-md z-10"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
}
