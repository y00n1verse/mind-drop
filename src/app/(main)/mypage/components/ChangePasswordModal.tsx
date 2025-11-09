'use client';

import { toast } from 'sonner';
import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import FormInput from '@/app/components/common/FormInput';
import { AxiosError } from 'axios';

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
      toast.success('비밀번호 변경 성공!');
      reset();
      onClose();
    } catch (e) {
      const error = e as AxiosError<{ message?: string }>;
      const message = error.response?.data?.message;

      setError('currentPassword', { message });
      toast.error('비밀번호 변경 실패');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
      title="비밀번호 변경"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-6"
      >
        <FormInput
          type="password"
          placeholder="현재 비밀번호"
          register={register('currentPassword', {
            required: '현재 비밀번호를 입력해주세요.',
            validate: (value) =>
              value.trim().length > 0 || '공백만 입력할 수 없어요.',
          })}
          error={errors.currentPassword}
          className="rounded-lg border"
        />
        <FormInput
          type="password"
          placeholder="새 비밀번호"
          register={register('newPassword', {
            required: '새 비밀번호를 입력해주세요.',
            minLength: { value: 8, message: '8자 이상 입력해주세요.' },
            pattern: {
              value: passwordRegex,
              message: '영문 대/소문자, 숫자 및 특수문자를 모두 포함해야 해요.',
            },
          })}
          error={errors.newPassword}
          className="rounded-lg border"
        />
        <FormInput
          type="password"
          placeholder="새 비밀번호 확인"
          register={register('confirmPassword', {
            required: '비밀번호를 한 번 더 입력해주세요.',
            validate: (value) =>
              value === watch('newPassword') ||
              '새 비밀번호가 일치하지 않아요.',
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
          {isSubmitting ? '변경 중' : '비밀번호 변경'}
        </Button>
      </form>
    </Modal>
  );
}
