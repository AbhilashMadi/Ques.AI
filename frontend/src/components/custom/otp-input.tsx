import { useState, useRef, type FC, type ChangeEvent, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string) => void;
  isInvalid?: boolean;
  disabled?: boolean;
  className?: string;
}

const OtpInput: FC<OtpInputProps> = ({
  length = 6,
  onChange,
  isInvalid = false,
  disabled = false,
  className,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index]?.focus();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, ''); // digits only
    if (!val) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = val.charAt(0);
    setOtp(updatedOtp);
    onChange?.(updatedOtp.join(''));

    if (index < length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const updatedOtp = [...otp];
      if (otp[index]) {
        updatedOtp[index] = '';
        setOtp(updatedOtp);
        onChange?.(updatedOtp.join(''));
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }
  };

  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={el => { inputsRef.current[index] = el }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className={cn(
            'size-11.5 text-center text-lg rounded border border-input bg-white',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            isInvalid && 'border-destructive focus:ring-destructive/50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
      ))}
    </div>
  );
};

export default OtpInput;
