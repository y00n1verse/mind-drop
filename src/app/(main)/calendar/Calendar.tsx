'use client';

import 'react-day-picker/style.css';
import { DayPicker } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { emotions } from '@/constants/emotions';
import { enUS, ko, zhCN } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { useDiaryStore } from '@/stores/useDiaryStore';

export default function Calendar() {
  const today = useMemo(() => new Date(), []);
  const { diaries, selectedDate, setSelectedDate, getUserDiaries } =
    useDiaryStore();
  const [month, setMonth] = useState<Date>(today);
  const { i18n } = useTranslation();

  const localeMap = {
    ko: ko,
    en: enUS,
    zh: zhCN,
  };

  const currentLocale =
    localeMap[i18n.language as keyof typeof localeMap] || ko;

  useEffect(() => {
    if (!selectedDate) {
      const formatted = today.toLocaleDateString('sv-SE');
      setSelectedDate(formatted);
    }
  }, [selectedDate, setSelectedDate]);

  useEffect(() => {
    getUserDiaries();
  }, [getUserDiaries]);

  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      setMonth(dateObj);
    }
  }, [selectedDate]);

  return (
    <div className="mx-auto w-full rounded-md bg-[oklch(0.937_0_0)] px-0 pt-3 pb-4 md:w-[700px] md:pt-6 lg:w-full lg:pt-8">
      <DayPicker
        locale={currentLocale}
        animate
        mode="single"
        navLayout="around"
        selected={selectedDate ? new Date(selectedDate) : undefined}
        month={month}
        onMonthChange={setMonth}
        onSelect={(date) => {
          if (date) {
            const formatted = date.toLocaleDateString('sv-SE');
            setSelectedDate(formatted);
          }
        }}
        disabled={{ after: today }}
        classNames={{
          months: 'flex flex-col w-full items-center',
          table: 'w-full table-fixed',
          day_button:
            'flex flex-col items-center justify-start cursor-pointer p-1 gap-1 sm:gap-2 text-[10px] w-[12vw] h-[12vw] min-w-[2.5rem] min-h-[2.5rem] rounded-md hover:bg-gray-100 transition-colors max-[767px]:w-[14vw] max-[767px]:h-[14vw] md:w-24 md:h-24 lg:w-20 lg:h-20 xl:w-[5.5rem] xl:h-[5.5rem] 2xl:w-23 2xl:h-23',
          selected: 'rounded-lg bg-gray-100',
        }}
        components={{
          DayButton: ({ day, ...buttonProps }) => {
            const formatted = day.date.toLocaleDateString('sv-SE');
            const diary = diaries.find((d) => d.date === formatted);
            const emotionData = emotions.find(
              (e) => e.variant === diary?.emotion,
            );

            return (
              <button {...buttonProps} className={buttonProps.className ?? ''}>
                <span>{day.date.getDate()}</span>
                {emotionData && (
                  <emotionData.Icon
                    className={`h-14 w-14 sm:h-15 sm:w-15 lg:h-18 lg:w-18 ${emotionData.color}`}
                  />
                )}
              </button>
            );
          },
        }}
      />
    </div>
  );
}
