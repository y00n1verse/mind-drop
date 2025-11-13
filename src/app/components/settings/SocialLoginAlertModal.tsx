'use client';

import { useTranslation } from 'react-i18next';
import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';

interface SocialLoginAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider?: string | null;
}

export default function SocialLoginAlertModal({
  isOpen,
  onClose,
  provider,
}: SocialLoginAlertModalProps) {
  const { t } = useTranslation();

  const providerLabel =
    provider === 'google'
      ? 'Google'
      : provider === 'kakao'
        ? 'Kakao'
        : provider === 'naver'
          ? 'Naver'
          : t('socialAlert.localLogin');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('socialAlert.title')}
      description={
        <>
          <p className="text-base whitespace-pre-line text-gray-700">
            {t('socialAlert.message', {
              span: (chunks: string) => (
                <span className="text-[var(--color-warn-bg)]">{chunks}</span>
              ),
            })}
          </p>
          <p className="my-2 text-sm text-gray-500">
            {t('socialAlert.connected')}:{' '}
            <span className="font-semibold text-gray-800">{providerLabel}</span>
          </p>
        </>
      }
    >
      <Button size="large" variant="complete" onClick={onClose}>
        {t('socialAlert.confirm')}
      </Button>
    </Modal>
  );
}
