import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    ns: ['game', 'landing', 'ranking', 'setting', 'translation', 'user'],
    fallbackLng: 'ko',
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json',
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

i18next.use({
  type: 'postProcessor',
  name: 'seasonHandler',
  process: (value: string, _: unknown, options: Record<string, any>) => {
    if (options.season === 0) {
      return options.lng === 'ko' ? '베타 시즌' : 'Beta Season';
    }
    return value.replace('{{season}}', options.season);
  },
});

export default i18next;
