import { XIcon } from '@icons';
import { Button } from '@custom';
import ReactDOM from 'react-dom';
import { type FC, type ReactNode } from 'react';
import useKeyPress from '@hooks/use-key-press';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title, className }) => {
  useKeyPress('Escape', onClose, isOpen);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className={cn('relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-secondary', className)}>
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h4>
          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close modal"
          >
            <XIcon height={16} />
          </Button>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};

export default Modal;