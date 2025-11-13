'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import { ArrowUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState, useRef } from 'react';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';

export default function LandingWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: session } = useSession();
  const { getUserDiaries } = useDiaryStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session) getUserDiaries();
  }, [session, getUserDiaries]);

  if (!isClient) return null;

  return (
    <>
      <Swiper
        direction="vertical"
        speed={700}
        mousewheel={{ forceToAxis: true }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Keyboard, Pagination]}
        className="h-screen"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setShowButton(swiper.activeIndex >= 1);
        }}
      >
        <SwiperSlide>
          <Section1 />
        </SwiperSlide>
        <SwiperSlide>
          <Section2 />
        </SwiperSlide>
        <SwiperSlide>
          <Section3 />
        </SwiperSlide>
        <SwiperSlide>
          <Section4 />
        </SwiperSlide>
        <SwiperSlide>
          <Section5 />
        </SwiperSlide>
      </Swiper>

      {showButton && (
        <button
          onClick={() => swiperRef.current?.slideTo(0)}
          className="fixed right-4 bottom-20 z-[99] cursor-pointer rounded-full bg-[var(--color-brand-primary)] p-3 text-white shadow-lg transition-all hover:scale-110 md:right-6 md:bottom-6"
          aria-label="맨 위로 이동"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}
