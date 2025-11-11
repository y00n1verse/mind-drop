'use client';

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SettingsButton from '@/app/components/settings/SettingsButton'; // ✅ 재사용

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
    <SettingsButton
      onClick={toggleLanguage}
      icon={<Languages />}
      label={t('language.label')}
      animatedLabel
      animationKey={lang}
    />
  );
}
