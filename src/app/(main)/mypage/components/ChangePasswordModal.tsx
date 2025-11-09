'use client';

import { toast } from 'sonner';
import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import FormInput from '@/app/components/common/FormInput';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).+$/;

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { t } = useTranslation();

  const {
    watch,
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await instance.post('/auth/change-password', data);
      toast.success(t('password.success'));
      reset();
      onClose();
    } catch (e) {
      const error = e as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message || t('password.defaultError');
      setError('currentPassword', { message });
      toast.error(t('password.errorToast'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title={t('password.modalTitle')}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-6"
      >
        <FormInput
          type="password"
          placeholder={t('password.current')}
          register={register('currentPassword', {
            required: t('password.requiredCurrent'),
            validate: (value) => value.trim().length > 0 || t('password.empty'),
          })}
          error={errors.currentPassword}
          className="rounded-lg border"
        />
        <FormInput
          type="password"
          placeholder={t('password.new')}
          register={register('newPassword', {
            required: t('password.requiredNew'),
            minLength: {
              value: 8,
              message: t('password.minLength'),
            },
            pattern: {
              value: passwordRegex,
              message: t('password.pattern'),
            },
          })}
          error={errors.newPassword}
          className="rounded-lg border"
        />
        <FormInput
          type="password"
          placeholder={t('password.confirm')}
          register={register('confirmPassword', {
            required: t('password.requiredConfirm'),
            validate: (value) =>
              value === watch('newPassword') || t('password.notMatch'),
          })}
          error={errors.confirmPassword}
          className="rounded-lg border"
        />
        <Button
          type="submit"
          variant="complete"
          className="mt-2 h-10 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('password.button.submitting')
            : t('password.button.submit')}
        </Button>
      </form>
    </Modal>
  );
}
