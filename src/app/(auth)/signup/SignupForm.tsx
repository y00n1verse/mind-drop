'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import Spinner from '@/app/loading';
import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Button from '@/app/components/common/Button';
import MindDropText from '@/assets/icons/MindDropText.svg';
import FormInput from '@/app/components/common/FormInput';
import Link from 'next/link';

export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).+$/;

export default function SignupForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    mode: 'onBlur',
  });

  const checkEmailDuplicate = async (email: string) => {
    const { data } = await instance.post('/auth/check-duplicate', { email });
    return data.exists;
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);

      if (await checkEmailDuplicate(data.email)) {
        setError('email', { message: t('signup.error.duplicate') });
        return;
      }
      await instance.post('/signup', data);
      toast.success(t('signup.success'));
      router.push('/signin');
    } catch {
      setError('email', { message: t('signup.error.server') });
      toast.error(t('signup.error.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-16 flex w-full max-w-md flex-col items-center gap-6 px-4 md:gap-8 md:px-0"
    >
      <header className="flex flex-col items-center gap-3">
        <Link href="/" className="transition hover:opacity-80">
          <MindDropText className="h-auto w-52 md:w-64" />
        </Link>
        <h1 className="mb-2 text-center text-xl text-gray-800">
          {t('signup.title')}
        </h1>
      </header>

      <FormInput
        type="email"
        placeholder={t('signup.emailPlaceholder')}
        register={register('email', {
          required: t('signup.validation.email.required'),
        })}
        error={errors.email}
      />
      <FormInput
        type="text"
        placeholder={t('signup.nicknamePlaceholder')}
        register={register('nickname', {
          required: t('signup.validation.nickname.required'),
        })}
        error={errors.nickname}
      />
      <FormInput
        type="password"
        placeholder={t('signup.passwordPlaceholder')}
        register={register('password', {
          required: t('signup.validation.password.required'),
          minLength: {
            value: 8,
            message: t('signup.validation.password.minLength'),
          },
          pattern: {
            value: passwordRegex,
            message: t('signup.validation.password.pattern'),
          },
        })}
        error={errors.password}
      />
      <FormInput
        type="password"
        placeholder={t('signup.confirmPasswordPlaceholder')}
        register={register('confirmPassword', {
          required: t('signup.validation.confirmPassword.required'),
          validate: (value) =>
            value === watch('password') ||
            t('signup.validation.confirmPassword.mismatch'),
        })}
        error={errors.confirmPassword}
      />
      <Button
        type="submit"
        variant="complete"
        className="mt-2 h-12 w-full"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? <Spinner /> : t('signup.submit')}
      </Button>

      <p className="text-md mt-3 text-center">
        {t('signup.haveAccount')}{' '}
        <Link href="/signin" className="text-blue-700 hover:underline">
          {t('signup.signIn')}
        </Link>
      </p>
    </form>
  );
}
