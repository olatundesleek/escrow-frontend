'use client';

import { createContext, useContext, useState } from 'react';

interface StickyContextType {
  isIntersecting: boolean;
  setIsIntersecting: (value: boolean) => void;
}

const StickyContext = createContext<StickyContextType | undefined>(undefined);

export const StickyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  return (
    <StickyContext.Provider
      value={{
        isIntersecting,
        setIsIntersecting,
      }}
    >
      {children}
    </StickyContext.Provider>
  );
};

export const useStickyContext = () => {
  const context = useContext(StickyContext);
  if (!context)
    throw new Error(
      'useStickyContext must be used within a StickyContextProvider',
    );
  return context;
};
