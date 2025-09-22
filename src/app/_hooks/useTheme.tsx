"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { lightDbTheme, darkDbTheme } from "../_utils/theme";

const DbThemeContext = createContext<any>(null);

export function DbThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(darkDbTheme);

  useEffect(() => {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === lightDbTheme ? darkDbTheme : lightDbTheme));

  return (
    <DbThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </DbThemeContext.Provider>
  );
}

export const useDbTheme = () => useContext(DbThemeContext);
