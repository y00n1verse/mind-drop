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
      <section className="mb-20 flex flex-col items-center justify-center gap-4 pb-24 md:mt-24 md:pb-12 lg:mx-15 lg:mt-28 lg:flex-row lg:items-stretch lg:justify-center lg:gap-10">
        <div className="flex w-full justify-center lg:w-3/5">
          <Calendar />
        </div>
        <div className="flex w-full justify-center lg:w-2/5">
          <DiaryPanel />
        </div>

        {isLoading && <Spinner variant="fade" />}
      </section>
    </AuthGuard>
  );
}
