'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChartColumn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Section4() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen items-center justify-center bg-[var(--background-secondary)] px-4 md:px-6">
      <div className="w-full max-w-3xl">
        <motion.article
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-[var(--color-brand-primary)] p-6 shadow-lg md:flex-row md:p-10"
        >
          <div className="flex w-full flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="order-2 mt-4 flex w-full justify-center md:order-1 md:mt-0 md:w-1/2">
              <Image
                src="/assets/images/section4-1.png"
                alt="감정 통계"
                width={400}
                height={400}
                loading="eager"
                className="w-[80%] max-w-[420px] rounded-lg shadow-md lg:w-[100%]"
              />
            </div>
            <div className="order-1 flex w-full flex-col items-center text-center md:order-2 md:w-1/2 md:gap-3">
              <div className="mb-3 rounded-3xl border border-gray-200 bg-white p-2 shadow-sm">
                <ChartColumn
                  width={32}
                  height={32}
                  className="text-[var(--color-brand-primary)]"
                />
              </div>
              <h2 className="mb-2 text-lg font-semibold md:text-2xl lg:text-3xl">
                {t('landing.section4.title')}
              </h2>
              <p className="text-base leading-relaxed whitespace-pre-line text-[var(--text-secondary)] md:text-lg lg:text-xl">
                {t('landing.section4.description')}
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
