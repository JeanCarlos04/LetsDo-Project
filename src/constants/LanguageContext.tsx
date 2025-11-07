import { createContext, useState, type ReactNode } from "react";

type ContextProps = {
  children: ReactNode;
};

type LanguageContext = "es" | "us";

type ContextTypes = {
  handleLanguage: () => void;
};

const defaultValues: ContextTypes = {
  handleLanguage: () => {},
};

const LanguageContext = createContext(defaultValues);

const LanguageContextProvider = ({ children }: ContextProps) => {
  const [language, setLanguage] = useState<LanguageContext>("es");

  const handleLanguage = () => {
    setLanguage(language === "es" ? "us" : "es");
  };

  return (
    <LanguageContext.Provider value={{ handleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageContextProvider };
