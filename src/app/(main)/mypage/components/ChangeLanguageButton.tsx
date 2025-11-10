'use client';

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChangeLanguageButton() {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'ko');

  const toggleLanguage = () => {
    const nextLang = lang === 'ko' ? 'en' : lang === 'en' ? 'zh' : 'ko';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('lang', nextLang);
    setLang(nextLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== lang) {
      i18n.changeLanguage(savedLang);
      setLang(savedLang);
    }
  }, []);

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
            {t('language.label')}
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  );
}
