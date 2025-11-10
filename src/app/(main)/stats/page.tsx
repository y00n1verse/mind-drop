'use client';

import Spinner from '@/app/loading';
import { useLoadingStore } from '@/stores/useLoadingStore';
import EmotionMonthlyChart from './components/EmotionMonthlyChart';
import EmotionSummaryCard from './components/EmotionSummaryCard';
import AuthGuard from '@/app/components/AuthGuard';

export default function EmotionReportPage() {
  const { isLoading } = useLoadingStore();

  return (
    <AuthGuard>
      <div className="mx-auto mb-15 flex w-full max-w-6xl flex-col items-center justify-center gap-10 p-6 lg:flex-row lg:items-start lg:justify-around">
        <div className="w-full lg:w-[50%]">
          <EmotionMonthlyChart />
        </div>
        <div className="w-full lg:w-[50%]">
          <EmotionSummaryCard />
        </div>

        {isLoading && <Spinner variant="fade" />}
      </div>
    </AuthGuard>
  );
}
