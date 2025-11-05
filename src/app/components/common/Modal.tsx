'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useRef, PropsWithChildren, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: React.ReactNode;
  className?: string;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      type: 'spring',
      stiffness: 250,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  className,
  children,
}: PropsWithChildren<ModalProps>) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={modalRef}
          className="fixed inset-0 z-99 flex flex-col items-center justify-center bg-black/40"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.target === modalRef.current && onClose()}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              'relative w-[380px] rounded-xl bg-white px-8 py-10 shadow-md',
              'flex flex-col items-center gap-1 text-center',
              className,
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>
            {title && (
              <h2 className="mt-2 mb-4 text-xl font-semibold text-[var(--text-secondary)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mb-2 text-base text-[var(--text-secondary)]">
                {description}
              </p>
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
