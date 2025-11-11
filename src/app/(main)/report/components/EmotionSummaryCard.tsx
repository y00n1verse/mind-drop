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
    <div className="flex h-full flex-col justify-between gap-2">
      <div className="mt-2 mb-1">
        <h1 className="text-lg font-semibold">{t('emotionSummary.title')}</h1>
        <p className="text-sm text-[#959595]">
          {t('emotionSummary.description')}
        </p>
      </div>

      <div className="w-full flex-1 flex-col gap-4 rounded-md bg-white p-5 shadow-sm md:gap-6 lg:gap-8">
        <div className="flex flex-shrink-0 items-center justify-between pb-3">
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

        <div className="flex flex-1 flex-col justify-between">
          {total === 0 ? (
            <p className="text-center text-gray-500">
              {t('emotionSummary.noData', {
                month: format(currentDate, t('emotionSummary.dateFormat')),
              })}
            </p>
          ) : (
            <>
              <div className="my-2 flex justify-around lg:my-11">
                {emotionRatios.map(
                  ({ label, variant, Icon, color, percent }) => (
                    <div
                      key={variant}
                      className="flex flex-col items-center gap-2 rounded-md p-2"
                    >
                      <Icon
                        className={`h-12 w-12 md:h-14 md:w-14 lg:h-17 lg:w-17 ${color}`}
                      />
                      <Label label={label} variant={variant} size="small" />
                      <p
                        className={`text-base font-medium md:text-lg ${
                          percent > 0 ? 'text-black' : 'text-gray-500'
                        }`}
                      >
                        {percent}%
                      </p>
                    </div>
                  ),
                )}
              </div>

              <div className="flex flex-col gap-1 border-t-2 border-gray-100 pt-4 text-sm md:text-base">
                <p>
                  {mostFeeling.length > 1
                    ? t('emotionSummary.mostPrefixPlural')
                    : t('emotionSummary.mostPrefixSingular')}{' '}
                  {mostFeeling.map((e, i) => (
                    <span key={e.variant}>
                      <span className={`font-medium ${e.color}`}>
                        {e.label}
                      </span>
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
                      <span className={`font-medium ${e.color}`}>
                        {e.label}
                      </span>
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
    </div>
  );
}
