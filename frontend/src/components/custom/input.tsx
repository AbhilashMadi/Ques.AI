import { type FC, type InputHTMLAttributes, useId } from 'react';
import { cn } from '@lib/utils';
import { Label } from '@custom';

export const inputVariantStyles = {
  default: cn(
    'bg-white border border-input',
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

export const inputSizeStyles = {
  sm: 'py-1.5 px-2.5 text-sm rounded-sm',
  md: 'py-2 px-3 text-base rounded-md',
  lg: 'py-3 px-4 text-lg rounded-lg',
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  errorMessage?: string;
  className?: string;
  variant?: keyof typeof inputVariantStyles;
  inputSize?: keyof typeof inputSizeStyles;
}

const Input: FC<InputProps> = ({
  label,
  touched,
  errorMessage,
  className,
  disabled,
  variant = 'default',
  inputSize = 'md',
  required,
  ...props
}) => {
  const autoId = useId();
  const isError = Boolean(touched && errorMessage);
  const id = props.id ?? `input-${autoId}`;

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && (
        <Label
          htmlFor={id}
          className={cn(isError && 'text-destructive', disabled && 'opacity-50')}
          required={required}
        >
          {label}
        </Label>
      )}
      <input
        id={id}
        disabled={disabled}
        {...props}
        required={false}
        className={cn(
          'w-full transition-colors focus:outline-none focus:shadow-sm',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          inputVariantStyles[variant],
          inputSizeStyles[inputSize],
          isError && 'border-destructive focus:border-destructive focus:ring-destructive/50',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      />
      {isError && <p className="text-sm text-destructive mt-1">{errorMessage}</p>}
    </div>
  );
};

export default Input;
