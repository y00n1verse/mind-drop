'use client';

import useModal from '@/app/hooks/useModal';
import Modal from '@/app/components/common/Modal';

export default function ModalTestPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button onClick={openModal} className="bg-green-300">
        모달 열기
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h1>모달 테스트</h1>
        <p>모달 내용</p>
      </Modal>
    </div>
  );
}
