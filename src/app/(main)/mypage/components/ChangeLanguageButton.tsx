'use client';

import { useState } from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChangeLanguageButton() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'ko');

  const toggleLanguage = () => {
    const nextLang = lang === 'ko' ? 'en' : lang === 'en' ? 'zh' : 'ko';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('lang', nextLang);
    setLang(nextLang);
  };

  const getLabel = (code: string) => {
    switch (code) {
      case 'ko':
        return `언어: 한국어`;
      case 'en':
        return `Language: English`;
      case 'zh':
        return `语言: 中文`;
      default:
        return `언어`;
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-full cursor-pointer rounded-sm px-5 py-3 text-left text-base font-medium transition hover:bg-gray-100 md:w-auto md:rounded-xl md:border md:border-gray-100 md:p-12 md:text-center md:shadow-md md:hover:bg-gray-100 lg:p-18"
    >
      <div className="flex items-center justify-start gap-2 md:flex-col md:justify-between">
        <Languages className="hidden text-gray-700 md:block md:h-28 md:w-28 lg:h-32 lg:w-32" />
        <AnimatePresence mode="wait">
          <motion.span
            key={lang}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="block md:mt-2 md:text-base md:font-semibold md:text-gray-600"
          >
            <span>{getLabel(lang)}</span>
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  );
}
