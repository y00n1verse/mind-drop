import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface FormTextareaProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export default function FormTextarea({
  placeholder,
  register,
  error,
  className,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col">
      <textarea
        {...register}
        placeholder={placeholder}
        className={clsx(
          'h-60 w-full resize-none border-b px-3 py-2 placeholder:text-gray-400 focus:outline-none',
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
