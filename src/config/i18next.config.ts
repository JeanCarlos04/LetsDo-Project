import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/enLanguage.json";
import es from "../locales/esLanguage.json";

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
