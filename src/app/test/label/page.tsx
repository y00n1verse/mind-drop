'use client';

import Label from '@/app/components/common/Label';
import BestIcon from '@/assets/icons/BestIcon.svg';
import GoodIcon from '@/assets/icons/GoodIcon.svg';
import NormalIcon from '@/assets/icons/NormalIcon.svg';
import BadIcon from '@/assets/icons/BadIcon.svg';
import WorstIcon from '@/assets/icons/WorstIcon.svg';

const emotions = [
  { label: '최고', variant: 'best', Icon: BestIcon },
  { label: '좋음', variant: 'good', Icon: GoodIcon },
  { label: '보통', variant: 'normal', Icon: NormalIcon },
  { label: '별로', variant: 'bad', Icon: BadIcon },
  { label: '최악', variant: 'worst', Icon: WorstIcon },
] as const;

export default function LabelTestPage() {
  return (
    <div className="flex items-center justify-center gap-2 px-4">
      {emotions.map(({ label, variant, Icon }) => (
        <div key={variant} className="flex flex-col items-center gap-1">
          <Icon className={`text-[var(--color-${variant})]`} />
          <Label label={label} variant={variant} />
        </div>
      ))}
    </div>
  );
}
