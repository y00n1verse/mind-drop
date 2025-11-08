'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function useI18nReady() {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
      return;
    }
    const handleInit = () => setReady(true);
    i18n.on('initialized', handleInit);

    return () => {
      i18n.off('initialized', handleInit);
    };
  }, [i18n]);

  return ready;
}
