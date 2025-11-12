'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../common/FormInput';
import EmotionSelector from './EmotionSelector';
import FormTextarea from './FormTextarea';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { EmotionType } from '@/constants/emotions';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface DiaryFormProps {
  mode: 'create' | 'edit';
  diary?: { title: string; content: string; emotion?: EmotionType };
  onSuccess: (data: DiaryFormData) => void;
  onFormStateChange?: (isValid: boolean) => void;
  onCancel?: () => void;
}

interface DiaryFormData {
  title: string;
  content: string;
  emotion: EmotionType;
}

export interface DiaryFormHandle {
  submit: () => void;
}

const DiaryForm = forwardRef<DiaryFormHandle, DiaryFormProps>(
  ({ mode, diary, onSuccess, onFormStateChange }, ref) => {
    const { t } = useTranslation();
    const { addDiary, updateDiary, selectedDate } = useDiaryStore();

    const {
      register,
      handleSubmit,
      setValue,
      setError,
      clearErrors,
      watch,
      formState: { errors },
    } = useForm<DiaryFormData>({
      mode: 'onChange',
      defaultValues: {
        title: diary?.title || '',
        content: diary?.content || '',
        emotion: diary?.emotion ?? undefined,
      },
    });

    const [, setIsSubmitting] = useState(false);
    const selectedEmotion = watch('emotion');

    const title = watch('title');
    const content = watch('content');
    const isFormValid =
      title.trim() !== '' && content.trim() !== '' && !!selectedEmotion;

    useEffect(() => {
      onFormStateChange?.(isFormValid);
    }, [isFormValid, onFormStateChange]);

    const handleEmotionSelect = (variant: EmotionType) => {
      setValue('emotion', variant);
      clearErrors('emotion');
    };

    const onSubmit = async (data: DiaryFormData) => {
      if (!data.emotion) {
        setError('emotion', {
          message: t('diaryForm.validation.selectEmotion'),
        });
        return;
      }

      if (!selectedDate) {
        console.error('선택된 날짜가 없습니다.');
        return;
      }

      setIsSubmitting(true);
      try {
        if (mode === 'create') {
          await addDiary({
            date: selectedDate,
            title: data.title,
            content: data.content,
            emotion: data.emotion,
          });
          toast.success(t('diaryForm.toast.createSuccess'));
        } else if (mode === 'edit') {
          await updateDiary(selectedDate, data);
          toast.success(t('diaryForm.toast.editSuccess'));
        }
        onSuccess(data);
      } catch {
        toast.error(t('diaryForm.toast.failed'));
      } finally {
        setIsSubmitting(false);
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(onSubmit),
    }));

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col gap-4 text-lg md:gap-6"
      >
        <div className="relative">
          <FormInput
            label={t('diaryForm.title')}
            type="text"
            placeholder={t('diaryForm.placeholder.title')}
            register={register('title', {
              required: t('diaryForm.validation.titleRequired'),
              maxLength: {
                value: 30,
                message: t('diaryForm.validation.titleMax', { count: 30 }),
              },
            })}
            error={errors.title}
            className="text-base md:text-lg"
          />
          <span className="absolute right-3 bottom-2 text-sm text-gray-400">
            {title.length} / 30
          </span>
        </div>

        <div className="relative">
          <FormTextarea
            label={t('diaryForm.content')}
            placeholder={t('diaryForm.placeholder.content')}
            register={register('content', {
              required: t('diaryForm.validation.contentRequired'),
              maxLength: {
                value: 500,
                message: t('diaryForm.validation.contentMax', { count: 500 }),
              },
            })}
            error={errors.content}
            className="text-base md:text-base"
          />
          <span className="absolute right-3 bottom-2 text-sm text-gray-400">
            {content.length} / 500
          </span>
        </div>

        <EmotionSelector
          selectedEmotion={selectedEmotion}
          onSelect={handleEmotionSelect}
          error={errors.emotion?.message}
        />

        <input
          type="hidden"
          {...register('emotion', {
            required: t('diaryForm.validation.selectEmotion'),
          })}
        />
      </form>
    );
  },
);

DiaryForm.displayName = 'DiaryForm';
export default DiaryForm;
