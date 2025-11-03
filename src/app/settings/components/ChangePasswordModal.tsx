'use client';

import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import FormInput from '@/app/components/common/FormInput';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await instance.post('/auth/change-password', data);
      alert('비밀번호를 변경했어요.');
      reset();
      onClose();
    } catch (e: any) {
      console.error(e);
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert('비밀번호를 변경하는 중 오류가 발생했어요.');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <div className="flex w-[380px] flex-col items-center px-7 py-8">
        <h2 className="mb-8 text-xl text-gray-800">비밀번호 변경</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-4"
        >
          <FormInput
            type="password"
            placeholder="현재 비밀번호"
            register={register('currentPassword', {
              required: '현재 비밀번호를 입력해주세요.',
            })}
            error={errors.currentPassword}
            className="rounded-lg border"
          />
          <FormInput
            type="password"
            placeholder="새 비밀번호"
            register={register('newPassword', {
              required: '새 비밀번호를 입력해주세요.',
            })}
            error={errors.newPassword}
            className="rounded-lg border"
          />
          <FormInput
            type="password"
            placeholder="새 비밀번호 확인"
            register={register('confirmPassword', {
              required: '비밀번호를 한 번 더 입력해주세요.',
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
      </div>
    </Modal>
  );
}
