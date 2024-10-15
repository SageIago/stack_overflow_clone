"use client";

import {
  useContext,
  useState,
  useEffect,
  ReactNode,
  createContext,
} from "react";

interface Props {
  children: ReactNode;
}

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState("");

  // INNER FUNCTION THAT HANDLES THE THEME CHANGE
  const handleThemeChange = () => {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(()=> {
    handleThemeChange()

  }, [mode])
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useTheme() {
  const Context = useContext(ThemeContext);

  if (Context === undefined) {
    throw new Error("Use Theme Must be used Within a Theme Provider");
  }

  return Context;
}
