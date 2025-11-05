'use client';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';
import FormInput from '@/app/components/common/FormInput';

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
      onClose();
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>;
      const msg =
        err.response?.data?.message ||
        '닉네임을 변경하는 중 오류가 발생했어요.';
      setError('nickname', { message: msg });
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
        <h2 className="mb-8 text-xl text-gray-800">닉네임 변경</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-4"
        >
          <FormInput
            type="text"
            placeholder="닉네임"
            register={register('nickname', {
              required: '닉네임을 입력해주세요.',
              validate: (v) =>
                v.trim().length > 0 || '닉네임은 공백일 수 없어요.',
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
            {isSubmitting ? '변경 중' : '닉네임 변경'}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
