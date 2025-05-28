import type { FC } from 'react';
import { Button } from '@custom';
import { BellIcon } from '@icons';
import type { IButtonProps } from '@components/custom/button';
import { useLogoutUserMutation } from '@redux/auth/auth-api';

const LogoutButton: FC<IButtonProps> = (props) => {
  const [logout] = useLogoutUserMutation();

  const handleClick = async (...args: Parameters<NonNullable<IButtonProps['onClick']>>) => {
    await logout();
    if (props.onClick) props.onClick(...args);
  };

  return (
    <Button {...props} onClick={handleClick}>
      <BellIcon height={18} />
    </Button>
  );
};

export default LogoutButton;
