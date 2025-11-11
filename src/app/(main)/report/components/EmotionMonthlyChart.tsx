'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { emotions } from '@/constants/emotions';
import { enUS, ko, zhCN } from 'date-fns/locale';
import Label from '@/app/components/common/Label';
import { TickItem } from 'recharts/types/util/types';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { addMonths, format, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getEmotionStatsByMonth } from '@/utils/getEmotionStatsByMonth';
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const LOCALE_MAP = { ko, en: enUS, zh: zhCN } as const;

interface EmotionTickProps {
  x?: number;
  y?: number;
  payload: TickItem & { value: string };
}

function EmotionTick({ x = 0, y = 0, payload }: EmotionTickProps) {
  const emotion = emotions.find((e) => e.label === payload.value);
  if (!emotion) return null;
  const { Icon, label, color, variant } = emotion;

  return (
    <g transform={`translate(${x - 40},${y + 12})`}>
      <foreignObject width={80} height={90}>
        <div className="flex flex-col items-center gap-2">
          <Icon
            className={`h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 ${color}`}
          />
          <Label label={label} variant={variant} size="small" />
        </div>
      </foreignObject>
    </g>
  );
}

export default function EmotionMonthlyChart() {
  const { t, i18n } = useTranslation();
  const { diaries } = useDiaryStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const locale = LOCALE_MAP[i18n.language as keyof typeof LOCALE_MAP] || ko;

  const currentMonth = format(currentDate, 'yyyy-MM');

  const chartData = getEmotionStatsByMonth(diaries, currentMonth);

  const handlePrevMonth = () => setCurrentDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setCurrentDate((d) => addMonths(d, 1));

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div className="mt-2 mb-1">
        <h1 className="text-lg font-semibold">
          {t('emotionMonthlyChart.title')}
        </h1>
        <p className="text-sm text-[#959595]">
          {t('emotionMonthlyChart.description')}
        </p>
      </div>

      <div className="w-full flex-1 rounded-md bg-white p-5 shadow-sm">
        <div className="flex flex-shrink-0 items-center justify-between pb-3">
          <button
            onClick={handlePrevMonth}
            className="cursor-pointer rounded-md hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>
          <p>
            {format(currentDate, t('emotionMonthlyChart.dateFormat'), {
              locale,
            })}
          </p>
          <button
            onClick={handleNextMonth}
            className="cursor-pointer rounded-md hover:bg-gray-100"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="relative h-[250px] flex-1 lg:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 40, right: 10, bottom: 80, left: 10 }}
            >
              <XAxis
                axisLine={{ stroke: '#DCDCDC', strokeWidth: 0.5 }}
                dataKey="label"
                tick={(props) => <EmotionTick {...props} />}
                tickLine={false}
              />
              <Bar dataKey="uv" barSize={40} radius={3}>
                <LabelList
                  dataKey="uv"
                  position="top"
                  fill="#959595"
                  fontSize={14}
                />
                {chartData.map((entry) => (
                  <Cell
                    key={entry.variant}
                    fill={`var(--color-${entry.variant})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
