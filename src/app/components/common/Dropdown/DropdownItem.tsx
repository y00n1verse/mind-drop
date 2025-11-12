'use client';

import clsx from 'clsx';
import { useDropdown } from './Dropdown';

interface DropdownItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

export const DropdownItem = ({
  children,
  onSelect,
  className,
}: DropdownItemProps) => {
  const { close } = useDropdown();

  const handleClick = () => {
    onSelect?.();
    close();
  };

  return (
    <li
      onClick={handleClick}
      className={clsx(
        'cursor-pointer rounded-xl p-3 text-center text-sm hover:bg-gray-100',
        className,
      )}
    >
      {children}
    </li>
  );
};
