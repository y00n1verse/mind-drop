'use client';
import Spinner from '@/app/loading';
import Calendar from './Calendar';
import DiaryPanel from './DiaryPanel';
import AuthGuard from '@/app/components/AuthGuard';
import { useLoadingStore } from '@/stores/useLoadingStore';

export default function CalendarPage() {
  const { isLoading } = useLoadingStore();

  return (
    <AuthGuard>
      <div className="relative flex flex-col md:mx-10 md:mt-25 md:flex-row md:gap-5 lg:mx-15 lg:mt-30 lg:gap-5">
        <Calendar />
        <DiaryPanel />

        {isLoading && <Spinner variant="fade" />}
      </div>
    </AuthGuard>
  );
}
