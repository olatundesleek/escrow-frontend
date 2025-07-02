"use client";

import { useStickyContext } from "../_context/StickyContext";
import { useIntersectionObserver } from "../_hooks/useIntersectionObserver";

export default function StickyObserverBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsIntersecting } = useStickyContext();
  const ref = useIntersectionObserver(setIsIntersecting);

  return (
    <div ref={ref} className="relative w-full text-white overflow-hidden">
      <div className="absolute inset-0 bg-secondary" aria-hidden="true" />
      <div className="relative z-10 w-full px-4 py-16 lg:py-32 flex justify-center items-center text-center">
        {children}
      </div>
    </div>
  );
}
