'use client';

import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import 'fullpage.js/dist/fullpage.css';
import { ArrowUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import { useDiaryStore } from '@/stores/useDiaryStore';

type FullpageApi = {
  moveTo: (section: number, slide?: number) => void;
};

export default function LandingWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const fullpageRef = useRef<FullpageApi | null>(null);

  const { data: session } = useSession();
  const { getUserDiaries } = useDiaryStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (session) {
      getUserDiaries();
    }
  }, [session, getUserDiaries]);

  if (!isClient) return null;

  return (
    <>
      {/* @ts-expect-error: ReactFullpage is not typed for Next.js SSR */}
      <ReactFullpage
        scrollingSpeed={700}
        easing="easeInOutCubic"
        navigation
        fitToSection
        autoScrolling
        scrollBar={false}
        licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
        afterLoad={(_, destination) => {
          setShowButton(destination.index >= 1);
        }}
        render={({ fullpageApi }) => {
          if (fullpageApi && !fullpageRef.current) {
            fullpageRef.current = fullpageApi;
          }

          return (
            <ReactFullpage.Wrapper>
              <Section1 />
              <Section2 />
              <Section3 />
              <Section4 />
              <Section5 />
            </ReactFullpage.Wrapper>
          );
        }}
      />

      {showButton && (
        <button
          onClick={() => fullpageRef.current?.moveTo(1)}
          className="fixed right-4 bottom-20 z-[99] cursor-pointer rounded-full bg-[var(--color-brand-primary)] p-3 text-white shadow-lg transition-all hover:scale-110 md:right-6 md:bottom-6"
          aria-label="맨 위로 이동"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}
