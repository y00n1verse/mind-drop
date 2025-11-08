'use client';

import i18n from 'i18next';
import ko from '@/locales/ko.json';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: { translation: ko },
  en: { translation: en },
  zh: { translation: zh },
};

i18n.use(initReactI18next).init({
  resources,
  lng: (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'ko',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
