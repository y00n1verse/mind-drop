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
      <div className="mx-auto mb-15 flex w-full flex-col items-center justify-center gap-10 p-6 lg:gap-16">
        <div className="w-full lg:w-[65%]">
          <EmotionMonthlyChart />
        </div>
        <div className="w-full lg:w-[65%]">
          <EmotionSummaryCard />
        </div>

        {isLoading && <Spinner variant="fade" />}
      </div>
    </AuthGuard>
  );
}
