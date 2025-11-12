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
      <p className="p-2 text-base font-medium text-gray-800">
        {t('emotionSelector.title')}{' '}
        {error ? (
          <span className="text-sm text-[var(--color-warn-bg)]">{error}</span>
        ) : (
          <span className="text-sm text-gray-500 md:text-base">
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
                className={`h-14 w-14 md:h-18 md:w-18 lg:h-20 lg:w-20 ${color} ${
                  isSelected ? 'opacity-100' : 'opacity-80'
                }`}
              />
              <Label
                size="small"
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
