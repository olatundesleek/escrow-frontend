"use client";

import { useStickyContext } from "../_context/StickyContext";
import { useIntersectionObserver } from "../_hooks/useIntersectionObserver";
import EscrowAction from "./EscrowAction";
import HomeBannerTitle from "./HomeBannerTitle";
import { FaCoins } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { TbShield } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa6";

export default function HomepageBanner() {
  const { setIsIntersecting } = useStickyContext();
  const ref = useIntersectionObserver(setIsIntersecting, 0.15);

  return (
    <header
      ref={ref}
      className="relative w-full bg-primary-section text-white overflow-hidden"
      aria-label="Homepage Financial Banner"
    >
      {/* Decorative Background Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GiMoneyStack
          className="absolute top-8 left-8  text-[220px] text-secondary/10 -rotate-12"
          aria-hidden="true"
        />
        <FaCoins
          className="absolute bottom-10 right-10  text-[200px] text-secondary/10 rotate-12"
          aria-hidden="true"
        />
      </div>

      {/* Centerpiece Icon Composition */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative w-[300px] h-[300px] lg:w-[440px] lg:h-[440px] flex items-center justify-center">
          {/* Shield background */}
          <TbShield
            className="absolute text-[260px] lg:text-[320px] text-secondary/20"
            aria-hidden="true"
          />

          {/* Handshake foreground */}
          <FaHandshake
            className="relative z-10 text-[96px] lg:text-[130px] text-accent/20 drop-shadow-md"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Soft overlay radial light */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,_#f8fbff_0%,_transparent_80%)] opacity-20" />

      {/* Main Banner Content */}
      <section className="relative z-20 w-full px-4 py-10 lg:py-40 lg:px-32 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="w-full">
          <HomeBannerTitle />
        </div>

        <div className="w-full flex justify-center lg:justify-end mb-16">
          <EscrowAction />
        </div>
      </section>
    </header>
  );
}
