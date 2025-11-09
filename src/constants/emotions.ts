import i18n from '@/lib/i18n';
import BestIcon from '@/assets/icons/BestIcon.svg';
import GoodIcon from '@/assets/icons/GoodIcon.svg';
import NormalIcon from '@/assets/icons/NormalIcon.svg';
import BadIcon from '@/assets/icons/BadIcon.svg';
import WorstIcon from '@/assets/icons/WorstIcon.svg';

export const emotions = [
  {
    get label() {
      return i18n.t('emotions.best');
    },
    variant: 'best',
    Icon: BestIcon,
    color: 'text-[var(--color-best)]',
  },
  {
    get label() {
      return i18n.t('emotions.good');
    },
    variant: 'good',
    Icon: GoodIcon,
    color: 'text-[var(--color-good)]',
  },
  {
    get label() {
      return i18n.t('emotions.normal');
    },
    variant: 'normal',
    Icon: NormalIcon,
    color: 'text-[var(--color-normal)]',
  },
  {
    get label() {
      return i18n.t('emotions.bad');
    },
    variant: 'bad',
    Icon: BadIcon,
    color: 'text-[var(--color-bad)]',
  },
  {
    get label() {
      return i18n.t('emotions.worst');
    },
    variant: 'worst',
    Icon: WorstIcon,
    color: 'text-[var(--color-worst)]',
  },
] as const;

export type EmotionType = (typeof emotions)[number]['variant'];
