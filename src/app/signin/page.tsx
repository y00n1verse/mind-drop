'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../components/common/Button';
import NaverIcon from '@/assets/icons/NaverIcon.svg';
import KakaoIcon from '@/assets/icons/KakaoIcon.svg';
import GoogleIcon from '@/assets/icons/GoogleIcon.svg';
import FormInput from '../components/common/FormInput';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/',
      });

      if (res?.error) {
        setError('email', {
          message: '이메일 또는 비밀번호가 올바르지 않아요.',
        });
      } else {
        router.push('/');
      }
    } catch {
      setError('email', {
        message: '로그인 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-28 mb-14 flex w-100 flex-col gap-8 md:mt-0 md:w-lg"
      >
        <h1 className="mb-2 text-center text-2xl md:mt-20">로그인</h1>

        <FormInput
          type="email"
          placeholder="이메일 입력"
          register={register('email', {
            required: '이메일을 입력해주세요.',
            validate: (value) =>
              value.trim().length > 0 || '공백만 입력할 수 없어요.',
          })}
          error={errors.email}
        />

        <FormInput
          type="password"
          placeholder="비밀번호 입력"
          register={register('password', {
            required: '비밀번호를 입력해주세요.',
            validate: (value) =>
              value.trim().length > 0 || '공백만 입력할 수 없어요.',
          })}
          error={errors.password}
        />

        <Button
          type="submit"
          size="large"
          variant="complete"
          className="mt-4 w-full"
        >
          로그인
        </Button>

        <p className="text-md mt-3 text-center">
          아직 계정이 없으신가요?{' '}
          <a
            href="/signup"
            className="text-md text-blue-700 underline hover:text-blue-500"
          >
            회원가입
          </a>
        </p>

        <div className="mt-3 flex items-center space-x-6">
          <div className="h-px grow bg-gray-300"></div>
          <p className="text-gray-600">또는</p>
          <div className="h-px grow bg-gray-300"></div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => signIn('naver', { callbackUrl: '/' })}
          >
            <NaverIcon />
          </button>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <GoogleIcon />
          </button>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => signIn('kakao', { callbackUrl: '/' })}
          >
            <KakaoIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
