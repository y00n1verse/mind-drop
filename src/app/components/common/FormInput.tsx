import clsx from 'clsx';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label?: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export default function FormInput({
  label,
  type,
  placeholder,
  register,
  error,
  className,
}: FormInputProps) {
  return (
    <div className="flex w-full flex-col">
      {label && (
        <label className="p-2 text-base font-medium text-gray-800">
          {label}
        </label>
      )}
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        onCopy={(e) => {
          if (type === 'password') e.preventDefault();
        }}
        onPaste={(e) => {
          if (type === 'password') e.preventDefault();
        }}
        onCut={(e) => {
          if (type === 'password') e.preventDefault();
        }}
        className={clsx(
          'w-full rounded-lg border-1 px-3 py-2 placeholder:text-gray-400 focus:outline-none',
          error
            ? 'border-[var(--color-warn-bg)] focus:border-[var(--color-warn-bg)]'
            : 'border-gray-500 focus:border-[var(--color-brand-primary-hover)]',
          className,
        )}
      />
      {error && (
        <p className="mt-2 ml-2 text-left text-sm text-[var(--color-warn-bg)]">
          {error.message}
        </p>
      )}
    </div>
  );
}
