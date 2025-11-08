'use client';

import 'fullpage.js/dist/fullpage.css';
import ReactFullpage from '@fullpage/react-fullpage';

export default function LandingPage() {
  return (
    // @ts-expect-error
    <ReactFullpage
      scrollingSpeed={700}
      easing="easeInOutCubic"
      navigation
      fitToSection={true}
      autoScrolling={true}
      scrollBar={false}
      licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
      render={() => (
        <ReactFullpage.Wrapper>
          <div className="section flex h-screen items-center justify-center bg-[var(--background-tertiary)] text-xl">
            1 페이지
          </div>
          <div className="section flex h-screen items-center justify-center bg-[var(--background-tertiary)] text-xl">
            2 페이지
          </div>
          <div className="section flex h-screen items-center justify-center bg-[var(--background-tertiary)] text-xl">
            3 페이지
          </div>
          <div className="section flex h-screen items-center justify-center bg-[var(--background-tertiary)] text-xl">
            4 페이지
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  );
}
