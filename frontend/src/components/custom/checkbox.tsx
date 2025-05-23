import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ id, label, className, ...props }: CheckboxProps) => {
  const customId = useId();
  const checkboxId = id || props.name || `checkbox-${customId}`;

  return (
    <div className="flex items-center mb-4">
      <input
        id={checkboxId}
        type="checkbox"
        className={cn(
          'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm',
          'focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800',
          'focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
