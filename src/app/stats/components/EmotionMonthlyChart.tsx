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

const mockData = emotions.map((emotion) => ({
  ...emotion,
  uv: Math.floor(Math.random() * 30) + 1,
}));

function EmotionTick({ x, y, payload }: any) {
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
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-lg font-semibold">월별 기분 분포</h1>
        <p className="text-sm text-[#959595]">
          월 단위로 기록했던 기분을 한눈에 볼 수 있어요
        </p>
      </div>

      <div className="w-full rounded-md bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3">
          <button className="cursor-pointer rounded-md hover:bg-gray-100">
            <ChevronLeft />
          </button>
          <p>2025-10-01 ~ 2025-10-31</p>
          <button className="cursor-pointer rounded-md hover:bg-gray-100">
            <ChevronRight />
          </button>
        </div>

        <div className="relative h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData}
              margin={{ top: 40, right: 10, bottom: 80, left: 10 }}
            >
              <XAxis
                axisLine={{ stroke: '#DCDCDC', strokeWidth: 0.5 }}
                dataKey="label"
                tick={<EmotionTick />}
                tickLine={false}
              />
              <Bar dataKey="uv" barSize={40} radius={3}>
                <LabelList
                  dataKey="uv"
                  position="top"
                  fill="#959595"
                  fontSize={14}
                />
                {mockData.map((entry, index) => (
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
