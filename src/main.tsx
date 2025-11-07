import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./contexts/MainContext.tsx";
import { LightModeContextProvider } from "./contexts/LightModeContext.tsx";
import { LanguageContextProvider } from "./constants/LanguageContext.tsx";
import "./config/i18next.config.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MainContextProvider>
        <LightModeContextProvider>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
        </LightModeContextProvider>
      </MainContextProvider>
    </BrowserRouter>
  </StrictMode>
);
