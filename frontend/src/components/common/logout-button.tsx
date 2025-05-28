import type { IButtonProps } from '@components/custom/button';
import type { ITooltipProps } from '@components/custom/tooltip';
import type { IIconProps } from '@components/icons';
import type { FC } from 'react';

import { Button, Tooltip } from '@custom';
import { LogOutIcon } from '@icons';
import { useLogoutUserMutation } from '@redux/auth/auth-api';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface ILogoutButtonProps {
  tooltipProps?: Partial<ITooltipProps>,
  buttonProps?: Partial<IButtonProps>,
  iconProps?: Partial<IIconProps>,
}

const LogoutButton: FC<ILogoutButtonProps> = (props) => {
  const { buttonProps, iconProps, tooltipProps } = props;
  const [logout] = useLogoutUserMutation();

  const handleClick = async (...args: Parameters<NonNullable<IButtonProps['onClick']>>) => {
    try {
      const { message } = await logout().unwrap();
      toast.success(message);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || error.message || 'Something went wrong');
    }

    if (buttonProps?.onClick) buttonProps.onClick(...args);
  };

  return (
    <Tooltip {...tooltipProps} content={tooltipProps?.content ?? 'Logout'}>
      <Button {...buttonProps} onClick={handleClick}>
        <LogOutIcon
          {...iconProps}
          height={iconProps?.height ?? 16}
          className={cn('text-destructive', iconProps?.className)} />
      </Button>
    </Tooltip>
  );
};

export default LogoutButton;
