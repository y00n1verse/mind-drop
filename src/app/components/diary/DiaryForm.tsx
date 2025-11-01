'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import FormInput from '../common/FormInput';
import EmotionSelector from './EmotionSelector';
import FormTextarea from './FormTextarea';
import { useDiaryStore } from '@/stores/useDiaryStore';
import { EmotionType } from '@/constants/emotions';
import { useRouter } from 'next/navigation';

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
  ({ mode, diary, onSuccess, onFormStateChange, onCancel }, ref) => {
    const router = useRouter();
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
      defaultValues: {
        title: diary?.title || '',
        content: diary?.content || '',
        emotion: diary?.emotion ?? undefined,
      },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
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
        setError('emotion', { message: '감정을 선택해주세요.' });
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
        } else if (mode === 'edit') {
          await updateDiary(selectedDate, data);
        }

        onSuccess(data);
      } catch (e) {
        console.error('일기 저장 실패:', e);
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
        className="flex w-full max-w-2xl flex-col gap-8 text-lg"
      >
        <FormInput
          type="text"
          placeholder="제목"
          register={register('title', { required: '제목은 필수에요.' })}
          error={errors.title}
          className="text-xl md:text-2xl"
        />

        <FormTextarea
          placeholder="오늘 하루는 어땠는지 자유롭게 적어보세요."
          register={register('content', { required: '일기 내용은 필수에요.' })}
          error={errors.content}
          className="text-lg md:text-xl"
        />

        <EmotionSelector
          selectedEmotion={selectedEmotion}
          onSelect={handleEmotionSelect}
          error={errors.emotion?.message}
        />

        <input
          type="hidden"
          {...register('emotion', { required: '감정을 선택해주세요.' })}
        />

        <div className="mt-10 hidden justify-end gap-3 md:flex">
          <Button
            type="button"
            size="large"
            variant="cancel"
            onClick={() => {
              if (mode === 'edit' && onCancel) {
                onCancel();
              } else {
                router.push('/calendar');
              }
            }}
          >
            취소
          </Button>
          <Button
            type="submit"
            size="large"
            variant="complete"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting
              ? '저장 중...'
              : mode === 'create'
                ? '저장하기'
                : '수정하기'}
          </Button>
        </div>
      </form>
    );
  },
);

export default DiaryForm;
