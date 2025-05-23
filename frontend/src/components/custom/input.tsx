import { type FC, type InputHTMLAttributes, useId } from 'react';
import { cn } from '@lib/utils';
import Label from '@components/custom/label';

export const inputVariantStyles = {
  default: cn(
    'bg-background border border-input bg-white',
    'focus:ring-2 focus:ring-ring focus:border-primary',
    'placeholder:text-muted-foreground'
  ),
  outline: cn(
    'bg-transparent border-2 border-border',
    'focus:border-primary focus:ring-1 focus:ring-ring',
    'placeholder:text-muted-foreground/70'
  ),
  ghost: cn(
    'bg-transparent border-b border-input',
    'focus:border-primary focus:ring-0',
    'placeholder:text-muted-foreground/60'
  ),
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  isValid?: boolean;
  className?: string;
  errorMessage?: string;
  required?: boolean;
  id?: string;
  variant?: 'default' | 'outline' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input: FC<InputProps> = ({
  label,
  touched = false,
  isValid = true,
  className,
  errorMessage,
  required = false,
  id,
  variant = 'default',
  inputSize = 'md',
  disabled,
  ...restProps
}) => {
  const uId = `input-${useId()}`;

  // Size styles
  const sizeStyles = {
    sm: 'py-1.5 px-2.5 text-sm rounded-sm',
    md: 'py-2 px-3 text-base rounded-md',
    lg: 'py-3 px-4 text-lg rounded-lg',
  };

  // State styles
  const stateStyles = cn(
    !isValid && touched && 'border-destructive focus:border-destructive focus:ring-destructive/50',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label
        htmlFor={id ?? uId}
        required={required}
        className={cn(
          !isValid && touched && 'text-destructive',
          disabled && 'opacity-50'
        )}
        children={label}
      />
      <input
        id={id ?? uId}
        disabled={disabled}
        {...restProps}
        className={cn(
          'w-full transition-colors',
          'focus:outline-none focus:shadow-sm',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          inputVariantStyles[variant],
          sizeStyles[inputSize],
          stateStyles,
          className
        )}
      />

      {!isValid && touched && errorMessage && (
        <p className="text-sm text-destructive mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;