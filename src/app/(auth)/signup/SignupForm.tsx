'use client';

import instance from '@/lib/instance';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Button from '@/app/components/common/Button';
import FormInput from '@/app/components/common/FormInput';
import { toast } from 'sonner';

export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).+$/;

export default function SignupForm() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { data: duplicateCheck } = await instance.post(
        '/auth/check-duplicate',
        { email: data.email },
      );

      if (duplicateCheck.exists) {
        setError('email', { message: t('signup.error.duplicate') });
        toast.error(t('signup.error.duplicate'));
        return;
      }

      await instance.post('/signup', data);
      toast.success(t('signup.success'));
      router.push('/signin');
    } catch {
      toast.error(t('signup.error.failed'));
      setError('email', {
        message: t('signup.error.server'),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-28 mb-14 flex w-100 flex-col gap-8 md:mt-0 md:w-lg"
    >
      <h1 className="mb-2 text-center text-2xl md:mt-20">
        {t('signup.title')}
      </h1>

      <FormInput
        type="text"
        placeholder={t('signup.emailPlaceholder')}
        register={register('email', {
          required: t('signup.validation.email.required'),
          minLength: {
            value: 5,
            message: t('signup.validation.email.minLength'),
          },
          validate: {
            notBlank: (value) =>
              value.trim().length > 0 || t('signup.validation.common.notBlank'),
            emailFormat: (value) => {
              const isEmailFormat = value.includes('@');
              if (isEmailFormat && !emailRegex.test(value)) {
                return t('signup.validation.email.invalid');
              }
              return true;
            },
          },
        })}
        error={errors.email}
      />
      <FormInput
        type="text"
        placeholder={t('signup.nicknamePlaceholder')}
        register={register('nickname', {
          required: t('signup.validation.nickname.required'),
          validate: (value) =>
            value.trim().length > 0 || t('signup.validation.nickname.notBlank'),
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
        size="large"
        variant="complete"
        className="mt-4 w-full"
      >
        {t('signup.submit')}
      </Button>

      <p className="text-md mt-3 text-center">
        {t('signup.haveAccount')}{' '}
        <a
          href="/signin"
          className="text-md text-blue-700 underline hover:text-blue-500"
        >
          {t('signup.signIn')}
        </a>
      </p>
    </form>
  );
}
