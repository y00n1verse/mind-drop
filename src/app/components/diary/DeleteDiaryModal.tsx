'use client';

import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useDiaryStore } from '@/stores/useDiaryStore';
import ConfirmModal from '@/app/components/common/ConfirmModal';

interface DeleteDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteDiaryModal({
  isOpen,
  onClose,
}: DeleteDiaryModalProps) {
  const { t } = useTranslation();
  const { selectedDate, deleteDiary } = useDiaryStore();

  const handleDelete = async () => {
    if (!selectedDate) return;
    try {
      await deleteDiary(selectedDate);
      toast.success(t('deleteDiary.success'));
    } catch {
      toast.error(t('deleteDiary.fail'));
    } finally {
      onClose();
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title={t('deleteDiary.modalTitle')}
      description={
        <p className="whitespace-pre-line">{t('deleteDiary.description')}</p>
      }
      confirmLabel={t('deleteDiary.confirmLabel')}
      cancelLabel={t('deleteDiary.cancelLabel')}
      confirmVariant="warn"
    />
  );
}
