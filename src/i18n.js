import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './languages/en/text_data.json';
import esTranslation from './languages/es/text_data.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
  },
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
