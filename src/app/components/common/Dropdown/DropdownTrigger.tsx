'use client';

import { useDropdown } from './Dropdown';

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const DropdownTrigger = ({
  children,
  className,
}: DropdownTriggerProps) => {
  const { toggle } = useDropdown();

  return (
    <button type="button" onClick={toggle} className={className}>
      {children}
    </button>
  );
};
