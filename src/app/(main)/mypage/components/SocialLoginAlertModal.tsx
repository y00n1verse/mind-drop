'use client';

import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';

interface SocialLoginAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider?: string;
}

export default function SocialLoginAlertModal({
  isOpen,
  onClose,
  provider,
}: SocialLoginAlertModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="비밀번호 변경 불가"
      description={
        <>
          <p className="text-base text-gray-700">
            소셜 로그인 계정은 <br />
            비밀번호 변경이{' '}
            <span className="text-[var(--color-warn-bg)]">불가능</span>해요.
          </p>
          <p className="my-2 text-sm text-gray-500">
            연결된 SNS:{' '}
            <span className="font-semibold text-gray-800">
              {provider === 'google' && 'Google'}
              {provider === 'kakao' && 'Kakao'}
              {provider === 'naver' && 'Naver'}
              {!['google', 'kakao', 'naver'].includes(provider || '') &&
                '자격 증명 로그인'}
            </span>
          </p>
        </>
      }
    >
      <Button size="large" variant="complete" onClick={onClose}>
        확인
      </Button>
    </Modal>
  );
}
