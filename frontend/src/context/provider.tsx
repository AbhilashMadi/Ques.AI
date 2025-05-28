import { useClaimMeQuery } from '@/redux/auth/auth-api';
import Loader from '@components/common/loader';
import ThemeProvider from '@context/theme-provider';
import { store } from '@redux/store';
import StorageKeys from '@resources/storage-keys';
import { type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default function Provider({ children }: { children: ReactNode }) {
  const { isFetching } = useClaimMeQuery();

  return (
    <ReduxProvider store={store}>
      <ThemeProvider storageKey={StorageKeys.APP_THEME}>
        <BrowserRouter>
          <Toaster />
          {isFetching ? <Loader /> : children}
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}
