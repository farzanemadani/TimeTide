import { createI18n } from 'vue-i18n';
import enLocale from './locales/en.json';
import faLocale from './locales/fa.json';

const messages = {
  en: enLocale,
  fa: faLocale
};

const i18n = createI18n({
  legacy: false, // Set to false for Composition API
  locale: 'en', // Set your desired default locale (e.g., 'fa' for Farsi)
  fallbackLocale: 'en',
  messages
});

export default i18n;