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

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = async (data: SignupFormData) => {
    try {
      if (data.email.length < 5) {
        setError('email', { message: '아이디는 5자 이상 입력해주세요.' });
        return;
      }

      const isEmailFormat = data.email.includes('@');
      if (isEmailFormat && !emailRegex.test(data.email)) {
        setError('email', { message: '이메일 형식이 올바르지 않아요.' });
        return;
      }

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
      className="mt-28 flex w-100 flex-col gap-8 md:mt-0"
    >
      <h1 className="mb-2 text-center text-2xl md:mt-20">회원가입</h1>

      <FormInput
        type="text"
        placeholder="아이디 또는 이메일"
        register={register('email', {
          required: '아이디 또는 이메일을 입력해주세요.',
        })}
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
