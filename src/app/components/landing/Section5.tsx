'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { useDiaryStore } from '@/stores/useDiaryStore';

export default function Section5() {
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const { getDiaryByDate, setSelectedDate } = useDiaryStore();

  const handleClick = () => {
    if (!session) {
      router.push('/signin');
      return;
    }
    const koreaDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Asia/Seoul',
    });
    setSelectedDate(koreaDate);
    const diary = getDiaryByDate(koreaDate);
    if (diary) {
      router.push(`/diary/detail?date=${koreaDate}`);
    } else {
      router.push(`/diary/form?date=${koreaDate}`);
    }
  };

  return (
    <div className="section flex h-screen flex-col items-center justify-center bg-[var(--background-tertiary)] pb-10 text-center md:pb-30">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center gap-2"
      >
        <h2 className="mb-3 text-3xl font-bold">
          {t('landing.section5.title')}
        </h2>
        <p className="mb-6 max-w-md text-lg whitespace-pre-line text-[color:var(--text-secondary)]">
          {t('landing.section5.description')}
        </p>
        <button
          onClick={handleClick}
          className="mt-6 cursor-pointer rounded-full bg-[var(--color-brand-primary)] px-8 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-brand-primary-hover)] lg:px-10"
        >
          {session
            ? t('landing.section5.button.write')
            : t('landing.section5.button.login')}
        </button>
      </motion.div>
    </div>
  );
}
