import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem("darkMode", newMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
