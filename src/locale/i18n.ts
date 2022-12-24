import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./message-en.json";
import ko from "./message-kr.json";

const resources = {
    en: {
        translation: en,
    },
    kr: {
        translation: ko
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'ko',
    debug: true,
    keySeparator: false,
    interpolation: {
        escapeValue: false
    }

});

export default i18next;