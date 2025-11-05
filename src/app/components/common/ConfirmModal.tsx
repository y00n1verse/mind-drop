'use client';

import Modal from '@/app/components/common/Modal';
import Button from '@/app/components/common/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'complete' | 'warn';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'ConfirmModal',
  description = '이곳은 설명란입니다.',
  confirmLabel = '확인',
  cancelLabel = '취소',
  confirmVariant = 'complete',
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="mt-4 flex w-full justify-center gap-3">
        <Button type="button" size="large" variant="cancel" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          size="large"
          type="button"
          variant={confirmVariant}
          onClick={() => {
            onConfirm?.();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
