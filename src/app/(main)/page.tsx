'use client';

import { ArrowUp } from 'lucide-react';
import 'fullpage.js/dist/fullpage.css';
import { useEffect, useRef, useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Section1 from '../components/landing/Section1';
import Section2 from '../components/landing/Section2';
import Section3 from '../components/landing/Section3';
import Section4 from '../components/landing/Section4';
import Section5 from '../components/landing/Section5';

type FullpageApi = {
  moveTo: (section: number, slide?: number) => void;
};

export default function LandingPage() {
  const [isClient, setIsClient] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const fullpageRef = useRef<FullpageApi | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          className="fixed right-4 bottom-20 z-[99] cursor-pointer rounded-full bg-[var(--color-brand-primary)] p-3 text-white shadow-lg transition-all hover:scale-110 md:right-6 md:right-8 md:bottom-6 md:bottom-8"
          aria-label="맨 위로 이동"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
}
