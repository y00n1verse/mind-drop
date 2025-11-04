'use client';

import instance from '../../lib/instance';
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).+$/;

export default function SignupForm() {
  const router = useRouter();
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
        {
          email: data.email,
        },
      );

      if (duplicateCheck.exists) {
        setError('email', { message: '이미 사용 중인 아이디예요.' });
        return;
      }

      await instance.post('/signup', data);
      router.push('/signin');
    } catch {
      setError('email', {
        message: '문제가 발생했어요. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-28 flex w-100 flex-col gap-8 md:mt-0 md:w-lg"
    >
      <h1 className="mb-2 text-center text-2xl md:mt-20">회원가입</h1>

      <FormInput
        type="text"
        placeholder="아이디 또는 이메일"
        register={register('email', {
          required: '아이디 또는 이메일을 입력해주세요.',
          minLength: { value: 5, message: '아이디는 5자 이상 입력해주세요.' },
          validate: {
            notBlank: (value) =>
              value.trim().length > 0 || '공백만 입력할 수 없어요.',
            emailFormat: (value) => {
              const isEmailFormat = value.includes('@');
              if (isEmailFormat && !emailRegex.test(value)) {
                return '이메일 형식이 올바르지 않아요.';
              }
              return true;
            },
          },
        })}
        error={errors.email}
      />
      <FormInput
        type="text"
        placeholder="닉네임"
        register={register('nickname', {
          required: '닉네임을 입력해주세요.',
          validate: (value) =>
            value.trim().length > 0 || '닉네임은 공백일 수 없어요.',
        })}
        error={errors.nickname}
      />
      <FormInput
        type="password"
        placeholder="비밀번호"
        register={register('password', {
          required: '비밀번호를 입력해주세요.',
          minLength: { value: 8, message: '8자 이상 입력해주세요.' },
          pattern: {
            value: passwordRegex,
            message: '영문 대/소문자, 숫자 및 특수문자를 모두 포함해야 해요.',
          },
        })}
        error={errors.password}
      />
      <FormInput
        type="password"
        placeholder="비밀번호 확인"
        register={register('confirmPassword', {
          required: '비밀번호를 다시 한 번 입력해주세요.',
          validate: (value) =>
            value === watch('password') || '비밀번호가 일치하지 않아요.',
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
