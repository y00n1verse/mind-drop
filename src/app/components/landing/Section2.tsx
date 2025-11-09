'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NotebookPen } from 'lucide-react';

export default function Section2() {
  return (
    <div className="section flex h-screen items-center justify-center bg-[var(--background-secondary)] px-2 md:pb-20">
      <div className="flex w-full max-w-5xl flex-col gap-8 md:flex-row md:justify-between">
        <motion.article
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex w-full items-center justify-between rounded-3xl border border-[var(--color-brand-primary)] px-3 py-8 shadow-lg md:p-10"
        >
          <div className="flex w-full flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="order-2 mt-4 flex w-full justify-center md:order-1 md:mt-0 md:w-1/2">
              <Image
                src="/assets/images/section2.png"
                alt="감정 일기"
                width={400}
                height={400}
                loading="eager"
                className="w-[80%] max-w-[420px] rounded-lg shadow-md lg:w-[90%]"
              />
            </div>

            <div className="flex w-full flex-col items-center text-center md:order-2 md:w-1/2 md:gap-3">
              <div className="mb-3 rounded-3xl border border-gray-200 bg-white p-2 shadow-sm">
                <NotebookPen
                  width={32}
                  height={32}
                  className="text-[var(--color-brand-primary)]"
                />
              </div>
              <h2 className="mb-2 text-lg font-semibold md:text-2xl lg:text-3xl">
                감정 일기
              </h2>
              <p className="text-base leading-relaxed text-[var(--text-secondary)] md:text-lg lg:text-xl">
                기분을 선택하고 <br />
                하루를 정리해요.
              </p>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
