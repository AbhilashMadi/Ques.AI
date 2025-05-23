import { cn } from '@/lib/utils';
import { useId, type InputHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const inputVarients = tv({
  base: 'block w-full rounded-lg border text-sm p-2.5 focus:outline-none focus:ring-2 transition-all',
  variants: {
    status: {
      default:
        'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500',
      success:
        'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500 dark:text-green-400 dark:placeholder-green-500',
      error:
        'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export type InputVariants = VariantProps<typeof inputVarients>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, InputVariants {
  label?: string;
  errorMessage?: string;
  successMessage?: string;
}

const Input = ({
  label,
  errorMessage,
  successMessage,
  status = 'default',
  className,
  id,
  ...props
}: InputProps) => {
  const customId = useId();
  const inputId = id || props.name || `input-${customId}`;
  const showError = status === 'error' && errorMessage;
  const showSuccess = status === 'success' && successMessage;

  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'block mb-2 text-sm font-medium',
            status === 'error'
              ? 'text-red-700 dark:text-red-500'
              : status === 'success'
                ? 'text-green-700 dark:text-green-500'
                : 'text-gray-900 dark:text-gray-300'
          )}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(inputVarients({ status }), className)}
        {...props}
      />
      {showError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oh, snapp!</span> {errorMessage}
        </p>
      )}
      {showSuccess && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-500">
          <span className="font-medium">Well done!</span> {successMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
