'use client';

import { signIn } from 'next-auth/react';
import Button from '../components/common/Button';
import NaverIcon from '@/assets/icons/NaverIcon.svg';
import GoogleIcon from '@/assets/icons/GoogleIcon.svg';
import KakaoIcon from '@/assets/icons/KakaoIcon.svg';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/',
    });

    if (res?.error) {
      console.log('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-100 flex-col gap-8"
      >
        <h1 className="mt-28 mb-2 text-center text-2xl">로그인</h1>

        <div className="flex w-full flex-col">
          <input
            {...register('email', { required: '이메일을 입력해주세요.' })}
            type="email"
            placeholder="이메일 입력"
            className={`w-full border-b px-3 py-2 focus:outline-none ${
              errors.email
                ? 'border-[var(--color-warn-bg)] focus:border-[var(--color-warn-bg)]'
                : 'border-gray-500 focus:border-[var(--color-brand-primary-hover)]'
            }`}
          />
          {errors.email && (
            <p className="mt-2 ml-2 text-left text-sm text-[var(--color-warn-bg)]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col">
          <input
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
            type="password"
            placeholder="비밀번호 입력"
            className={`w-full border-b px-3 py-2 focus:outline-none ${
              errors.password
                ? 'border-[var(--color-warn-bg)] focus:border-[var(--color-warn-bg)]'
                : 'border-gray-500 focus:border-[var(--color-brand-primary-hover)]'
            }`}
          />
          {errors.password && (
            <p className="mt-2 ml-2 text-left text-sm text-[var(--color-warn-bg)]">
              {errors.password.message}
            </p>
          )}
        </div>

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
