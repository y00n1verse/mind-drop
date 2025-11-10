import { emotions, EmotionType } from '@/constants/emotions';
import Label from '../common/Label';
import { useTranslation } from 'react-i18next';

interface EmotionSelectorProps {
  selectedEmotion: EmotionType;
  onSelect: (variant: EmotionType) => void;
  error?: string;
}

export default function EmotionSelector({
  selectedEmotion,
  onSelect,
  error,
}: EmotionSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg md:text-xl">
        {t('emotionSelector.title')}{' '}
        {error ? (
          <span className="text-sm text-[var(--color-warn-bg)]">{error}</span>
        ) : (
          <span className="text-base text-gray-500 md:text-lg">
            ({t('emotionSelector.hint')})
          </span>
        )}
      </p>

      <div className="flex justify-between md:justify-center md:gap-6">
        {emotions.map(({ label, variant, Icon, color }) => {
          const isSelected = selectedEmotion === variant;
          return (
            <button
              key={variant}
              type="button"
              onClick={() => onSelect(variant)}
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl p-2 transition-all ${
                isSelected ? 'scale-105' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Icon
                className={`h-17 w-17 md:h-21 md:w-21 lg:h-23 lg:w-23 ${color} ${
                  isSelected ? 'opacity-100' : 'opacity-80'
                }`}
              />
              <Label
                label={label}
                variant={variant}
                className={`mt-1 ${isSelected ? 'font-semibold' : 'opacity-80'}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
