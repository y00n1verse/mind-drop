'use client';

import { toast } from 'sonner';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import FormInput from '@/app/components/common/FormInput';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  nickname: string;
}

interface ApiErrorResponse {
  message?: string;
}

export default function ChangeNicknameModal({ isOpen, onClose }: Props) {
  const { data: session, update } = useSession();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!isOpen) return;
    reset({ nickname: session?.user?.nickname ?? '' });
  }, [isOpen, session?.user?.nickname, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      await instance.post('/user/nickname', data);
      await update({
        user: { ...session?.user, nickname: data.nickname },
      });
      toast.success(t('nickname.success'));
      onClose();
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      const msg = err.response?.data?.message || t('nickname.defaultError');
      setError('nickname', { message: msg });
      toast.error(t('nickname.errorToast'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title={t('nickname.modalTitle')}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4"
      >
        <FormInput
          type="text"
          placeholder={t('nickname.placeholder')}
          register={register('nickname', {
            required: t('nickname.required'),
            validate: (v) => v.trim().length > 0 || t('nickname.empty'),
          })}
          error={errors.nickname}
          className="rounded-lg border"
        />
        <Button
          type="submit"
          variant="complete"
          className="mt-2 h-10 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('nickname.button.submitting')
            : t('nickname.button.submit')}
        </Button>
      </form>
    </Modal>
  );
}
