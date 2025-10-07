"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { lightDbTheme, darkDbTheme } from "../_utils/theme";

// ✅ Define a type for your theme object
type Theme = typeof lightDbTheme;

// ✅ Define the shape of your context
interface DbThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const DbThemeContext = createContext<DbThemeContextType | undefined>(undefined);

export function DbThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(darkDbTheme);

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

export const useDbTheme = (): DbThemeContextType => {
  const context = useContext(DbThemeContext);
  if (!context) {
    throw new Error("useDbTheme must be used within a DbThemeProvider");
  }
  return context;
};
