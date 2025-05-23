
import { useId, type FC } from 'react';
import Label from '@components/custom/label';
import { cn } from '@/lib/utils';

interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: FC<ICheckboxProps> = (props) => {
  const { label, className, id, checked, ...restProps } = props;

  const generatedId = `checkbox-${useId()}`
  const checkboxId = id ?? generatedId;

  return (<div className="flex gap-1 items-center">
    <input
      checked={checked}
      id={checkboxId}
      type="checkbox"
      className={cn(
        'w-4 h-4 accent-primary bg-white rounded-sm ring-1 ring-gray-200 focus:ring-purple-500 focus:ring-2 dark:ring-gray-600 dark:bg-gray-700',
        className
      )}
      {...restProps}
    />
    <Label htmlFor={checkboxId}>{label}</Label>
  </div>)
}

export default Checkbox;