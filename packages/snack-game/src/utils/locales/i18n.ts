import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@utils/locales/en.json';
import ko from '@utils/locales/ko.json';

const resources = {
  'ko-KR': {
    translation: ko,
  },
  'en-US': {
    translation: en,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en_US',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        'navigator',
        'querystring',
        'cookie',
        'localStorage',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
