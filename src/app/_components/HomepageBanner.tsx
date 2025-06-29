"use client";
import { useStickyContext } from "../_context/StickyContext";
import { useIntersectionObserver } from "../_hooks/useIntersectionObserver";
import EscrowAction from "./EscrowAction";
import HomeBannerTitle from "./HomeBannerTitle";

export default function HomepageBanner() {
  const { setIsIntersecting } = useStickyContext();
  const ref = useIntersectionObserver(setIsIntersecting, 0.15);

  return (
    <header ref={ref} className={`relative w-full bg-primary text-white`}>
      <div className="absolute inset-0 bg-[url('/images/banner.png')] bg-no-repeat bg-contain bg-center z-0" />

      <div className="absolute inset-0 z-10 bg-[radial-gradient(aliceblue,_transparent)]" />

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
