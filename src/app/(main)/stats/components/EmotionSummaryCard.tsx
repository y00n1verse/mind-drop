'use client';

import { useState } from 'react';
import Label from '@/app/components/common/Label';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEmotionStatsByMonth } from '@/utils/getEmotionStatsByMonth';

export default function EmotionSummaryCard() {
  const { diaries } = useDiaryStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = format(currentDate, 'yyyy-MM');

  // 감정 통계
  const emotionData = getEmotionStatsByMonth(diaries, currentMonth);

  // 감정 비율
  const total = emotionData.reduce((sum, e) => sum + e.uv, 0);
  const emotionRatios = emotionData.map((e) => ({
    ...e,
    percent: total > 0 ? Math.round((e.uv / total) * 100) : 0,
  }));

  const maxPercent = Math.max(...emotionRatios.map((e) => e.percent));
  const minPercent = Math.min(...emotionRatios.map((e) => e.percent));

  const mostFeeling = emotionRatios.filter((e) => e.percent === maxPercent);
  const leastFeeling = emotionRatios.filter((e) => e.percent === minPercent);

  const handlePrevMonth = () => setCurrentDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setCurrentDate((d) => addMonths(d, 1));

  // 받침 유무에 따른 어미 반환 로직
  function getSentenceEnding(word: string | undefined) {
    if (!word || word.length === 0) return '이에요.';
    const lastChar = word.charCodeAt(word.length - 1);
    const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
    return hasBatchim ? '이에요.' : '예요.';
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-lg font-semibold">감정 요약</h1>
        <p className="text-sm text-[#959595]">
          월 단위로 기록된 감정 비율과 요약을 한 번에 볼 수 있어요
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-md bg-white p-5 shadow-sm md:gap-6 lg:gap-8">
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={handlePrevMonth}
            className="cursor-pointer rounded-md hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
          <p>{format(currentDate, 'yyyy년 MM월')}</p>
          <button
            onClick={handleNextMonth}
            className="cursor-pointer rounded-md hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="flex justify-around gap-4">
          {emotionRatios.map(({ label, variant, Icon, color, percent }) => (
            <div
              key={variant}
              className="flex flex-col items-center gap-2 rounded-md p-2"
            >
              <Icon
                className={`h-12 w-12 md:h-16 md:w-16 lg:h-14 lg:w-14 ${color}`}
              />
              <Label label={label} variant={variant} size="small" />
              <p
                className={`text-sm font-medium md:text-base ${
                  percent > 0 ? 'text-black' : 'text-gray-500'
                }`}
              >
                {percent}%
              </p>
            </div>
          ))}
        </div>

        {total === 0 ? (
          <p>
            - {format(currentDate, 'yyyy년 MM월')}에는 감정 데이터가 없어요.
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            <p>
              - 가장 많이 느낀 감정은{' '}
              {mostFeeling.map((e, i) => (
                <span key={e.variant} className={`font-medium ${e.color}`}>
                  {e.label}
                  {i < mostFeeling.length - 1 && ', '}
                </span>
              ))}
              {getSentenceEnding(mostFeeling[0].label)}
            </p>
            <p>
              - 가장 적게 느낀 감정은{' '}
              {leastFeeling.map((e, i) => (
                <span key={e.variant} className={`font-medium ${e.color}`}>
                  {e.label}
                  {i < leastFeeling.length - 1 && ', '}
                </span>
              ))}
              {getSentenceEnding(leastFeeling[0].label)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
