'use client';

import Link from 'next/link';
import { useState } from 'react';
import Spinner from '@/app/loading';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Button from '@/app/components/common/Button';
import NaverIcon from '@/assets/icons/NaverIcon.svg';
import KakaoIcon from '@/assets/icons/KakaoIcon.svg';
import GoogleIcon from '@/assets/icons/GoogleIcon.svg';
import FormInput from '@/app/components/common/FormInput';
import MindDropText from '@/assets/icons/MindDropText.svg';

interface LoginFormData {
  email: string;
  password: string;
}

export default function SigninForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ mode: 'onBlur' });

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
        setError('password', { message: t('login.error.invalidCredentials') });
      } else {
        router.push('/');
      }
    } catch {
      setError('email', { message: t('login.error.server') });
      setError('password', { message: t('login.error.server') });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-24 flex w-full max-w-md flex-col items-center gap-6 px-4 md:gap-8 md:px-0"
    >
      <header className="flex flex-col items-center gap-3">
        <Link href="/" className="transition hover:opacity-80">
          <MindDropText className="h-auto w-52 md:w-64" />
        </Link>
        <h1 className="mb-2 text-center text-xl text-gray-800">
          {t('login.title')}
        </h1>
      </header>

      <FormInput
        type="email"
        placeholder={t('login.emailPlaceholder')}
        register={register('email', {
          required: t('login.error.requiredEmail'),
        })}
        error={errors.email}
      />

      <FormInput
        type="password"
        placeholder={t('login.passwordPlaceholder')}
        register={register('password', {
          required: t('login.error.requiredPassword'),
        })}
        error={errors.password}
      />

      <Button
        type="submit"
        variant="complete"
        className="mt-2 h-12 w-full"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? <Spinner /> : t('login.submit')}
      </Button>

      <div className="flex w-full flex-col gap-6 md:gap-8">
        <p className="text-center">
          {t('login.noAccount')}{' '}
          <Link href="/signup" className="text-blue-700 hover:underline">
            {t('login.signUp')}
          </Link>
        </p>

        <div className="flex items-center space-x-6">
          <div className="h-px grow bg-gray-300"></div>
          <p className="text-gray-600">{t('login.or')}</p>
          <div className="h-px grow bg-gray-300"></div>
        </div>

        <div className="flex justify-center gap-5">
          {[
            { provider: 'naver', Icon: NaverIcon },
            { provider: 'google', Icon: GoogleIcon },
            { provider: 'kakao', Icon: KakaoIcon },
          ].map(({ provider, Icon }) => (
            <button
              key={provider}
              type="button"
              onClick={() => signIn(provider, { callbackUrl: '/' })}
              className="cursor-pointer"
              aria-label={`${provider} login`}
            >
              <Icon />
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
