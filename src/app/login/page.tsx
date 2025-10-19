'use client';

import Button from '../components/common/Button';

export default function LoginPage() {
  return (
    <div className="jusify-center flex flex-col items-center">
      <form className="flex w-72 flex-col items-center gap-4">
        <h1 className="mb-2 text-2xl">마인드 드롭 로그인</h1>
        <input
          type="email"
          placeholder="이메일 입력"
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="password"
          placeholder="비밀번호 입력"
          className="w-full rounded border px-3 py-2"
        />

        <Button
          type="submit"
          size="large"
          variant="complete"
          className="w-full"
        >
          로그인
        </Button>
      </form>
    </div>
  );
}
