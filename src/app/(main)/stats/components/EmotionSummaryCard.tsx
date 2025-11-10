'use client';

import { useState } from 'react';
import Label from '@/app/components/common/Label';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEmotionStatsByMonth } from '@/utils/getEmotionStatsByMonth';
import { useTranslation } from 'react-i18next';

export default function EmotionSummaryCard() {
  const { t, i18n } = useTranslation();
  const { diaries } = useDiaryStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = format(currentDate, 'yyyy-MM');

  const emotionData = getEmotionStatsByMonth(diaries, currentMonth);
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

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-lg font-semibold"> {t('emotionSummary.title')}</h1>
        <p className="text-sm text-[#959595]">
          {t('emotionSummary.description')}
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-md bg-white p-5 shadow-sm md:gap-6 lg:gap-8">
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={handlePrevMonth}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
          <p>{format(currentDate, t('emotionSummary.dateFormat'))}</p>
          <button
            onClick={handleNextMonth}
            className="rounded-md p-1 hover:bg-gray-100"
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
            {t('emotionSummary.noData', {
              month: format(currentDate, t('emotionSummary.dateFormat')),
            })}
          </p>
        ) : (
          <div className="flex flex-col gap-1 text-base">
            <p>
              <span>
                {mostFeeling.length > 1
                  ? t('emotionSummary.mostPrefixPlural')
                  : t('emotionSummary.mostPrefixSingular')}{' '}
              </span>
              {mostFeeling.map((e, i) => (
                <span key={e.variant}>
                  <span className={`font-medium ${e.color}`}>{e.label}</span>
                  {i < mostFeeling.length - 1 && (
                    <span>{t('emotionSummary.and')}</span>
                  )}
                </span>
              ))}
              <span>{t('emotionSummary.period')}</span>
            </p>

            <p>
              <span>
                {leastFeeling.length > 1
                  ? t('emotionSummary.leastPrefixPlural')
                  : t('emotionSummary.leastPrefixSingular')}{' '}
              </span>
              {leastFeeling.map((e, i) => (
                <span key={e.variant}>
                  <span className={`font-medium ${e.color}`}>{e.label}</span>
                  {i < leastFeeling.length - 1 && (
                    <span>{t('emotionSummary.and')}</span>
                  )}
                </span>
              ))}
              <span>{t('emotionSummary.period')}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
