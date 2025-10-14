'use client';

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  isOpen = true,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex flex-col items-center overflow-y-hidden rounded-xl bg-white">
        <button type="button" className="absolute top-4 right-4">
          X
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
