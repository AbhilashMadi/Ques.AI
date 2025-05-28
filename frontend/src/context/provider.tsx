import ThemeProvider from '@context/theme-provider';
import { useClaimMeQuery } from '@redux/auth/auth-api';
import { store } from '@redux/store';
import StorageKeys from '@resources/storage-keys';
import { type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const Auth = () => {
  // TODO: Keep the loader here
  useClaimMeQuery();
  return <></>;
}

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider storageKey={StorageKeys.APP_THEME}>
        <BrowserRouter>
          <Toaster />
          <Auth />
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  )
}