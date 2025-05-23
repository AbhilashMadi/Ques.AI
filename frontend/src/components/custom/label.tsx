import type { ReactNode, FC } from 'react';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

const Label: FC<LabelProps> = ({ children, htmlFor, required, className }) => {
  return (
    <label htmlFor={htmlFor} className={`text-foreground ${className}`}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
