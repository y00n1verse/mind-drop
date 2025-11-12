'use client';

import { useDropdown } from './Dropdown';

interface DropdownItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
}

export const DropdownItem = ({ children, onSelect }: DropdownItemProps) => {
  const { close } = useDropdown();

  const handleClick = () => {
    onSelect?.();
    close();
  };

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer rounded-xl p-3 text-center text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </li>
  );
};
