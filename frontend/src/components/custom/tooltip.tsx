import { cn } from '@/lib/utils';
import { type FC, type ReactNode, useState } from 'react';

export interface ITooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

const Tooltip: FC<ITooltipProps> = ({
  children,
  content,
  position = 'right',
  className = '',
  delay = 100,
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setVisible(false);
  };

  return (
    <div
      className="relative inline-flex w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Tooltip box */}
      {visible && (
        <div
          className={cn(
            'absolute z-[100] px-3 py-1.5 text-sm text-nowrap text-white bg-primary rounded-md shadow-lg transition-opacity duration-200',
            {
              'bottom-full left-1/2 transform -translate-x-1/2 mb-2': position === 'top',
              'top-full left-1/2 transform -translate-x-1/2 mt-2': position === 'bottom',
              'right-full top-1/2 transform -translate-y-1/2 mr-2': position === 'left',
              'left-full top-1/2 transform -translate-y-1/2 ml-2': position === 'right',
            },
            className
          )}
          role="tooltip">
          {content}
          {/* Tooltip arrow */}
          <div
            className={cn(
              'absolute w-2 h-2 bg-primary transform rotate-45',
              {
                'top-full left-1/2 -translate-x-1/2 -mt-1': position === 'top',
                'bottom-full left-1/2 -translate-x-1/2 -mb-1': position === 'bottom',
                'left-full top-1/2 -translate-y-1/2 -ml-1': position === 'left',
                'right-full top-1/2 -translate-y-1/2 -mr-1': position === 'right',
              }
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;