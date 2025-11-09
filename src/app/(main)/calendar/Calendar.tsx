'use client';

import 'react-day-picker/style.css';
import { enUS, ko, zhCN } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { emotions } from '@/constants/emotions';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { useTranslation } from 'react-i18next';

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
    <div className="flex justify-center rounded-md bg-[oklch(0.937_0_0)] pt-6 pb-2 md:px-3 lg:items-center lg:justify-start lg:p-8">
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
          day_button:
            'flex flex-col cursor-pointer justify-start items-center p-1 gap-1 text-xs w-17 h-17 rounded-md hover:bg-gray-100 transition-colors lg:p-1.5 lg:gap-1 md:w-20 md:h-18 lg:w-24 lg:h-22',
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
              <button
                {...buttonProps}
                className={`${buttonProps.className ?? ''}`}
              >
                <span>{day.date.getDate()}</span>
                {emotionData && (
                  <emotionData.Icon
                    className={`lg: h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ${emotionData.color}`}
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
