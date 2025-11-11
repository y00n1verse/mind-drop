import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface FormTextareaProps {
  label?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export default function FormTextarea({
  label,
  placeholder,
  register,
  error,
  className,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="p-2 text-base font-medium text-gray-800">
          {label}
        </label>
      )}
      <textarea
        {...register}
        placeholder={placeholder}
        className={clsx(
          'h-60 w-full resize-none rounded-lg border p-3 placeholder:text-gray-400 focus:outline-none',
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
