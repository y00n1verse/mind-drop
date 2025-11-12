'use client';

import { useDropdown } from './Dropdown';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownListProps {
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const DropdownList = ({
  children,
  className = '',
}: DropdownListProps) => {
  const { isOpen } = useDropdown();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className={`absolute mt-1 w-28 rounded-xl border border-gray-400 bg-white shadow-lg md:w-32 ${className}`}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
