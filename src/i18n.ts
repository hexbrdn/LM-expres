import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from './locales/de.json';
import en from './locales/en.json';
import tr from './locales/tr.json';

const resources = {
  de: { translation: de },
  en: { translation: en },
  tr: { translation: tr },
};

const STORAGE_KEY = 'lm-language';

// Restore the language the visitor picked last time (storage can be blocked)
const getStoredLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && stored in resources ? stored : 'de';
  } catch {
    return 'de';
  }
};

const initialLanguage = getStoredLanguage();
document.documentElement.lang = initialLanguage;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });

// Keep <html lang> in sync with the active language and remember the choice
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore (private mode / blocked storage)
  }
});

export default i18n;
