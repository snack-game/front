import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    fallbackLng: 'ko-KR',
    backend: {
      loadPath: './locale/{{lng}}/{{ns}}.json',
    },
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
      caches: ['localStorage'],
    },
  });

console.log(i18next.language);

export default i18next;
