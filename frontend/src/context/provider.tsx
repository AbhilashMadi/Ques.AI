import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@context/theme-provider';
import StorageKeys from '@resources/storage-keys';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider storageKey={StorageKeys.APP_THEME}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  )
}