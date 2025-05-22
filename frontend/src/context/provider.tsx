import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@context/theme-provider';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  )
}