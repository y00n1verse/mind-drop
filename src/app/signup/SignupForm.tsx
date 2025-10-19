'use client';

import instance from '../lib/instance';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';

export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await instance.post('/signup', data);

      console.log('회원가입이 완료되었습니다!', res.data);
      router.push('/login');
    } catch (error) {
      console.error('회원가입을 실패하였습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-72 flex-col gap-4"
    >
      <h1 className="mb-2 text-center text-2xl">회원가입</h1>

      <FormInput
        type="email"
        placeholder="이메일"
        register={register('email', { required: '이메일을 입력해주세요.' })}
        error={errors.email}
      />
      <FormInput
        type="text"
        placeholder="닉네임"
        register={register('nickname', { required: '닉네임을 입력해주세요.' })}
        error={errors.nickname}
      />
      <FormInput
        type="password"
        placeholder="비밀번호"
        register={register('password', {
          required: '비밀번호를 입력해주세요.',
        })}
        error={errors.password}
      />
      <FormInput
        type="password"
        placeholder="비밀번호 확인"
        register={register('confirmPassword', {
          required: '비밀번호를 다시 한 번 입력해주세요.',
        })}
        error={errors.confirmPassword}
      />
      <Button
        type="submit"
        size="large"
        variant="complete"
        className="mt-4 w-full"
      >
        회원가입
      </Button>
    </form>
  );
}
