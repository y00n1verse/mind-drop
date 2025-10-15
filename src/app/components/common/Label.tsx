import clsx from 'clsx';
import { ReactNode } from 'react';

type Emotion = 'best' | 'good' | 'normal' | 'bad' | 'worst';

interface LabelProps {
  label: string;
  variant: Emotion | 'tag';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: ReactNode;
}

const base = 'px-3 py-0.5 inline-block rounded-3xl text-white';

const sizeStyles = {
  small: 'px-2 py-0.5 text-sm',
  medium: 'px-3 py-1 text-md',
  large: 'px-4 py-1.5 text-lg',
};

const emotionStyles = {
  best: 'bg-best',
  good: 'bg-good',
  normal: 'bg-normal',
  bad: 'bg-bad',
  worst: 'bg-worst',
};

export default function Label({
  label,
  variant,
  size = 'medium',
  className,
}: LabelProps) {
  const emotionClass = variant === 'tag' ? undefined : emotionStyles[variant];

  return (
    <span className={clsx(base, sizeStyles[size], emotionClass, className)}>
      {label}
    </span>
  );
}
