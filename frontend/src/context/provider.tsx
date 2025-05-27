import type { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@context/theme-provider';
import StorageKeys from '@resources/storage-keys';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@redux/store';

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider storageKey={StorageKeys.APP_THEME}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  )
}