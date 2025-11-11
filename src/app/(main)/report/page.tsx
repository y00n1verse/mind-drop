'use client';

import Spinner from '@/app/loading';
import AuthGuard from '@/app/components/AuthGuard';
import { useLoadingStore } from '@/stores/useLoadingStore';
import EmotionMonthlyChart from './components/EmotionMonthlyChart';
import EmotionSummaryCard from './components/EmotionSummaryCard';

export default function EmotionReportPage() {
  const { isLoading } = useLoadingStore();

  return (
    <AuthGuard>
      <div className="mx-auto mb-16 flex w-full flex-col gap-5 px-4 py-3 md:mt-18 md:mb-4 md:p-6 lg:h-[560px] lg:flex-row lg:items-stretch lg:justify-between lg:gap-8">
        <div className="h-full w-full lg:w-1/2">
          <EmotionMonthlyChart />
        </div>
        <div className="h-full w-full lg:w-1/2">
          <EmotionSummaryCard />
        </div>

        {isLoading && <Spinner variant="fade" />}
      </div>
    </AuthGuard>
  );
}
