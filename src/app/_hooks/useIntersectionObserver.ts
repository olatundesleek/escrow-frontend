'use client';

import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  callback: (isIntersecting: boolean) => void,
  threshold: number = 0.15,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            callback(entry.isIntersecting);
          });
        },
        {
          threshold: threshold,
        },
      );

      const target = ref.current;
      if (target) {
        observer.observe(target);
      }

      return () => {
        if (target) observer.unobserve(target);
      };
    },
    [callback, threshold],
  );

  return ref;
}
