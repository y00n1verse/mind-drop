'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Label from '@/app/components/common/Label';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEmotionStatsByMonth } from '@/utils/getEmotionStatsByMonth';

export default function EmotionSummaryCard() {
  const { t } = useTranslation();
  const { diaries } = useDiaryStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = format(currentDate, 'yyyy-MM');

  const { emotionRatios, total, mostFeeling, leastFeeling } = useMemo(() => {
    const data = getEmotionStatsByMonth(diaries, currentMonth);
    const totalCount = data.reduce((sum, e) => sum + e.uv, 0);

    if (totalCount === 0) {
      return {
        emotionRatios: [],
        total: 0,
        mostFeeling: [],
        leastFeeling: [],
      };
    }

    const ratios = data.map((e) => ({
      ...e,
      percent: Math.round((e.uv / totalCount) * 100),
    }));

    const maxPercent = Math.max(...ratios.map((e) => e.percent));
    const minPercent = Math.min(...ratios.map((e) => e.percent));

    return {
      emotionRatios: ratios,
      total: totalCount,
      mostFeeling: ratios.filter((e) => e.percent === maxPercent),
      leastFeeling: ratios.filter((e) => e.percent === minPercent),
    };
  }, [diaries, currentMonth]);

  const handlePrevMonth = () => setCurrentDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setCurrentDate((d) => addMonths(d, 1));

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-lg font-semibold">{t('emotionSummary.title')}</h1>
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

        {total === 0 ? (
          <p className="text-center text-gray-500">
            {t('emotionSummary.noData', {
              month: format(currentDate, t('emotionSummary.dateFormat')),
            })}
          </p>
        ) : (
          <>
            <div className="flex justify-around">
              {emotionRatios.map(({ label, variant, Icon, color, percent }) => (
                <div
                  key={variant}
                  className="flex flex-col items-center gap-2 rounded-md p-2"
                >
                  <Icon
                    className={`h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ${color}`}
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

            <div className="flex flex-col gap-1 text-base">
              <p>
                {mostFeeling.length > 1
                  ? t('emotionSummary.mostPrefixPlural')
                  : t('emotionSummary.mostPrefixSingular')}{' '}
                {mostFeeling.map((e, i) => (
                  <span key={e.variant}>
                    <span className={`font-medium ${e.color}`}>{e.label}</span>
                    {i < mostFeeling.length - 1 &&
                      ` ${t('emotionSummary.and')} `}
                  </span>
                ))}
                {t('emotionSummary.period')}
              </p>

              <p>
                {leastFeeling.length > 1
                  ? t('emotionSummary.leastPrefixPlural')
                  : t('emotionSummary.leastPrefixSingular')}{' '}
                {leastFeeling.map((e, i) => (
                  <span key={e.variant}>
                    <span className={`font-medium ${e.color}`}>{e.label}</span>
                    {i < leastFeeling.length - 1 &&
                      ` ${t('emotionSummary.and')} `}
                  </span>
                ))}
                {t('emotionSummary.period')}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
