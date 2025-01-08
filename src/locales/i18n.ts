import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize';
import translationEN from './en/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (arg0: string) => void) => {
    const locale = Localization.getLocales()[0].languageTag;
    callback(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
