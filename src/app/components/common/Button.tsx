import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  size?: 'small' | 'medium' | 'large';
  variant: 'complete' | 'cancel' | 'warn';
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  type = 'button',
  size = 'medium',
  variant = 'complete',
  children,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles = clsx(
    'flex items-center justify-center rounded-xl border transition-colors duration-150',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );

  const disabledStyle =
    'bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed';

  const variantStyles = {
    complete: clsx(
      'border text-white',
      disabled
        ? disabledStyle
        : 'bg-[var(--color-complete-bg)] border-[var(--color-complete-border)] hover:bg-[var(--color-complete-hover)]',
    ),

    cancel: clsx(
      'border',
      disabled
        ? disabledStyle
        : 'text-[var(--color-cancel-text)] bg-[var(--color-cancel-bg)] border-[var(--color-cancel-border)] hover:bg-[var(--color-cancel-hover)]',
    ),

    warn: clsx(
      'border text-white',
      disabled
        ? disabledStyle
        : 'bg-[var(--color-warn-bg)] border-[var(--color-warn-border)] hover:bg-[var(--color-warn-hover)]',
    ),
  };

  const sizeStyles = {
    small: 'text-sm w-18 h-8 rounded-xl',
    medium: 'text-md w-24 h-9 rounded-xl',
    large: 'text-lg w-30 h-10 rounded-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
