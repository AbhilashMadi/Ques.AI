import { type FC, type InputHTMLAttributes, useId, useState } from 'react';
import { cn } from '@lib/utils';
import { Label } from '@custom';
import { EyeIcon, EyeCloseIcon } from '@icons';
import { inputVariantStyles, inputSizeStyles } from '@components/custom/input';

interface SecretInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  touched?: boolean;
  errorMessage?: string;
  className?: string;
  variant?: keyof typeof inputVariantStyles;
  inputSize?: keyof typeof inputSizeStyles;
}

const SecretInput: FC<SecretInputProps> = ({
  label,
  touched,
  errorMessage,
  className,
  disabled,
  variant = 'default',
  inputSize = 'md',
  ...props
}) => {
  const autoId = useId();
  const id = props.id ?? `secret-input-${autoId}`;
  const isError = Boolean(touched && errorMessage);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(prev => !prev);

  return (
    <div className="grid w-full items-center gap-1.5">
      {label && (
        <Label
          htmlFor={id}
          className={cn(isError && 'text-destructive', disabled && 'opacity-50')}
        >
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          disabled={disabled}
          required={false}
          {...props}
          className={cn(
            'w-full pr-10 transition-colors focus:outline-none focus:shadow-sm',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            inputVariantStyles[variant],
            inputSizeStyles[inputSize],
            isError && 'border-destructive focus:border-destructive focus:ring-destructive/50',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          tabIndex={-1}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {visible ? <EyeCloseIcon height={18} /> : <EyeIcon height={18} />}
        </button>
      </div>
      {isError && <p className="text-sm text-destructive mt-1">{errorMessage}</p>}
    </div>
  );
};

export default SecretInput;
