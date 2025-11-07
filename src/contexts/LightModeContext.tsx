import { createContext, useEffect, useState, type ReactNode } from "react";

type ContextProps = {
  children: ReactNode;
};

type LightModeType = "light" | "dark";

type ContextTypes = {
  handleLightMode: () => void;
};

const defaultValues: ContextTypes = {
  handleLightMode: () => {},
};

const LightMode = createContext(defaultValues);

const LightModeContextProvider = ({ children }: ContextProps) => {
  const [lightMode, setLightMode] = useState<LightModeType>("light");

  const handleLightMode = () => {
    setLightMode(lightMode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (lightMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [lightMode]);

  return (
    <LightMode.Provider value={{ handleLightMode }}>
      {children}
    </LightMode.Provider>
  );
};

export { LightMode, LightModeContextProvider };
