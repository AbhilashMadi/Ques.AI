
import type { FC } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@custom';
import { Sun, Moon } from '@icons';

const ThemeSwitch: FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark'

  return (<Button
    size="icon"
    onClick={() => setTheme(isDark ? 'light' : 'dark')}>
    {isDark ? <Sun height={18} width={18} /> : <Moon height={18} width={18} />}
  </Button>)
}

export default ThemeSwitch;