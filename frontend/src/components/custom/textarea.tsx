import { type FC, type TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@lib/utils';
import { Label } from '@custom';
import { inputVariantStyles, inputSizeStyles } from '@components/custom/input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  touched?: boolean;
  errorMessage?: string;
  className?: string;
  variant?: keyof typeof inputVariantStyles;
  inputSize?: keyof typeof inputSizeStyles;
}

const Textarea: FC<TextareaProps> = ({
  label,
  touched,
  errorMessage,
  className,
  disabled,
  required,
  variant = 'default',
  inputSize = 'md',
  ...props
}) => {
  const autoId = useId();
  const isError = Boolean(touched && errorMessage);
  const id = props.id ?? `textarea-${autoId}`;

  return (
    <div className="grid w-full items-start gap-1.5">
      {label && (
        <Label
          htmlFor={id}
          className={cn(isError && 'text-destructive', disabled && 'opacity-50')}
          required={required}
        >
          {label}
        </Label>
      )}
      <textarea
        id={id}
        disabled={disabled}
        rows={props.rows ?? 4}
        {...props}
        className={cn(
          'w-full resize-none transition-colors focus:outline-none focus:shadow-sm',
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

export default Textarea;
