'use client';

import Link from 'next/link';
import { useState } from 'react';
import Spinner from '@/app/loading';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Button from '../../components/common/Button';
import NaverIcon from '@/assets/icons/NaverIcon.svg';
import KakaoIcon from '@/assets/icons/KakaoIcon.svg';
import GoogleIcon from '@/assets/icons/GoogleIcon.svg';
import FormInput from '../../components/common/FormInput';
import MindDropText from '@/assets/icons/MindDropText.svg';
import { useTranslation } from 'react-i18next';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/',
      });

      if (res?.error) {
        setError('email', { message: t('login.error.invalidCredentials') });
      } else {
        router.push('/');
      }
    } catch {
      setError('email', { message: t('login.error.server') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 flex w-100 flex-col items-center gap-8 p-4 md:mt-36 md:mb-6 md:w-lg md:p-0"
      >
        <div className="flex flex-col gap-3">
          <Link href="/" className="transition hover:opacity-80">
            <MindDropText className="h-auto w-48 md:w-54" />
          </Link>
          <h1 className="mb-2 text-center text-2xl">{t('login.title')}</h1>
        </div>

        <FormInput
          type="email"
          placeholder={t('login.emailPlaceholder')}
          register={register('email', {
            required: t('login.error.requiredEmail'),
            validate: (value) =>
              value.trim().length > 0 || t('login.error.empty'),
          })}
          error={errors.email}
        />

        <FormInput
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          register={register('password', {
            required: t('login.error.requiredPassword'),
            validate: (value) =>
              value.trim().length > 0 || t('login.error.empty'),
          })}
          error={errors.password}
        />

        <Button
          type="submit"
          size="large"
          variant="complete"
          className="mt-4 w-full"
          disabled={isLoading}
        >
          {isLoading ? <Spinner variant="beat" /> : t('login.submit')}
        </Button>

        <p className="text-md mt-3 text-center">
          {t('login.noAccount')}{' '}
          <a
            href="/signup"
            className="text-md text-blue-700 underline hover:text-blue-500"
          >
            {t('login.signUp')}
          </a>
        </p>

        <div className="mt-3 flex items-center space-x-6">
          <div className="h-px grow bg-gray-300"></div>
          <p className="text-gray-600">{t('login.or')}</p>
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
