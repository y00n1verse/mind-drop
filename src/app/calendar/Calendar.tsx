'use client';

import { emotions } from '@/constants/emotions';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { ko } from 'date-fns/locale';
import { useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

export default function Calendar() {
  const today = new Date();
  const { diaries, selectedDate, setSelectedDate } = useDiaryStore();

  useEffect(() => {
    const formatted = today.toLocaleDateString('sv-SE');
    setSelectedDate(formatted);
  }, [setSelectedDate]);

  return (
    <div className="p-4 md:p-5 lg:p-8">
      <DayPicker
        locale={ko}
        mode="single"
        navLayout="around"
        selected={selectedDate ? new Date(selectedDate) : undefined}
        onSelect={(date) => {
          if (date) {
            const formatted = date.toLocaleDateString('sv-SE');
            setSelectedDate(formatted);
          }
        }}
        disabled={{ after: today }}
        classNames={{
          day_button:
            'flex flex-col cursor-pointer justify-start items-center p-1 gap-1 text-xs  w-17 h-15 rounded-md hover:bg-gray-100 transition-colors lg:p-1.5 lg:gap-1 md:w-21 md:h-19 lg:w-24 lg:h-22',
          selected: 'rounded-lg bg-gray-100',
        }}
        components={{
          DayButton: ({ day, modifiers, ...buttonProps }) => {
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
