'use client';

import Label from '@/app/components/common/Label';
import BestIcon from '@/assets/icons/BestIcon.svg';
import GoodIcon from '@/assets/icons/GoodIcon.svg';
import NormalIcon from '@/assets/icons/NormalIcon.svg';
import BadIcon from '@/assets/icons/BadIcon.svg';
import WorstIcon from '@/assets/icons/WorstIcon.svg';

const emotions = [
  {
    label: '최고',
    variant: 'best',
    Icon: BestIcon,
    color: 'text-[var(--color-best)]',
  },
  {
    label: '좋음',
    variant: 'good',
    Icon: GoodIcon,
    color: 'text-[var(--color-good)]',
  },
  {
    label: '보통',
    variant: 'normal',
    Icon: NormalIcon,
    color: 'text-[var(--color-normal)]',
  },
  {
    label: '별로',
    variant: 'bad',
    Icon: BadIcon,
    color: 'text-[var(--color-bad)]',
  },
  {
    label: '최악',
    variant: 'worst',
    Icon: WorstIcon,
    color: 'text-[var(--color-worst)]',
  },
] as const;

export default function LabelTestPage() {
  return (
    <div className="flex items-center justify-center gap-2 px-4">
      {emotions.map(({ label, Icon, color, variant }) => (
        <div key={variant} className="flex flex-col items-center gap-1">
          <Icon className={color} />
          <Label label={label} variant={variant} />
        </div>
      ))}
    </div>
  );
}
