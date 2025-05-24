import { useId, useState, type FC, type InputHTMLAttributes } from 'react';
import { cn } from '@lib/utils';
import { Label } from '@custom';
import { EyeIcon, EyeCloseIcon } from '@icons'
import { inputVariantStyles } from '@components/custom/input';

interface SecretInputProps extends InputHTMLAttributes<HTMLInputElement> {
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

const SecretInput: FC<SecretInputProps> = ({
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
  const uId = `secret-input-${useId()}`;
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  const sizeStyles = {
    sm: 'py-1.5 px-2.5 text-sm rounded-sm',
    md: 'py-2 px-3 text-base rounded-md',
    lg: 'py-3 px-4 text-lg rounded-lg',
  };

  const stateStyles = cn(
    !isValid && touched && 'border-destructive focus:border-destructive focus:ring-destructive/50',
    disabled && 'opacity-50 cursor-not-allowed'
  );

  return (
    <div className="grid w-full items-center gap-1.5 relative">
      <Label
        htmlFor={id ?? uId}
        required={required}
        className={cn(
          !isValid && touched && 'text-destructive',
          disabled && 'opacity-50'
        )}
        children={label}
      />
      <div className="relative">
        <input
          id={id ?? uId}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          {...restProps}
          className={cn(
            'w-full pr-10 transition-colors',
            'focus:outline-none focus:shadow-sm',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            inputVariantStyles[variant],
            sizeStyles[inputSize],
            stateStyles,
            className
          )}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          tabIndex={-1}
          className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {visible ? <EyeCloseIcon height={18} /> : <EyeIcon height={18} />}
        </button>
      </div>

      {!isValid && touched && errorMessage && (
        <p className="text-sm text-destructive mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default SecretInput;
