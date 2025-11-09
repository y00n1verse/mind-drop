'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Section5() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      router.push('/diary/form');
    } else {
      router.push('/signin');
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
        <h2 className="mb-3 text-3xl font-bold">나를 알아가는 시간</h2>
        <p className="mb-6 max-w-md text-lg text-[color:var(--text-secondary)]">
          오늘의 감정을 기록하며 <br /> 나를 조금 더 이해해볼까요?
        </p>
        <button
          onClick={handleClick}
          className="mt-6 cursor-pointer rounded-full bg-[var(--color-brand-primary)] px-8 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-brand-primary-hover)] lg:px-10"
        >
          {session ? '일기 쓰러가기' : '로그인 하러가기'}
        </button>
      </motion.div>
    </div>
  );
}
