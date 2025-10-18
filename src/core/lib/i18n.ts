import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/src/core/translations/en.json";
import es from "@/src/core/translations/es.json";

const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  lng: deviceLanguage,
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
