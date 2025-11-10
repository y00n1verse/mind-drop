'use client';

import { emotions } from '@/constants/emotions';
import Label from '@/app/components/common/Label';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { useMemo, useState } from 'react';
import { getEmotionStatsByMonth } from '@/utils/getEmotionStatsByMonth';
import { addMonths, format, subMonths } from 'date-fns';
import { TickItem } from 'recharts/types/util/types';
import { useTranslation } from 'react-i18next';
import { enUS, ko, zhCN } from 'date-fns/locale';

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
    <g transform={`translate(${x - 25},${y + 12})`}>
      <foreignObject width={50} height={80}>
        <div className="flex flex-col items-center gap-2">
          <Icon
            className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 ${color}`}
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

  const localeMap = { ko, en: enUS, zh: zhCN };
  const locale = localeMap[i18n.language as keyof typeof localeMap] || ko;

  const currentMonth = format(currentDate, 'yyyy-MM');

  const chartData = useMemo(
    () => getEmotionStatsByMonth(diaries, currentMonth),
    [diaries, currentMonth],
  );

  const handlePrevMonth = () => setCurrentDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setCurrentDate((d) => addMonths(d, 1));

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-lg font-semibold">
          {t('emotionMonthlyChart.title')}
        </h1>
        <p className="text-sm text-[#959595]">
          {t('emotionMonthlyChart.description')}
        </p>
      </div>

      <div className="w-full rounded-md bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3">
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

        <div className="relative h-[300px] w-full">
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
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
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
