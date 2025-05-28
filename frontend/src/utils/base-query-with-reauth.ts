import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import envConfig from '@configs/env-config';
import authSlice from '@redux/auth/auth-slice';

// Raw baseQuery with credentials and base URL setup
const rawBaseQuery = fetchBaseQuery({
  baseUrl: envConfig.BACKEND_BASE_URL,
  credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Initial request
  let result = await rawBaseQuery(args, api, extraOptions);

  // If 401, try to refresh token
  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh-tokens', method: 'GET', credentials: 'include' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Retry the original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, clear user state
      api.dispatch(authSlice.actions.clearUser());
    }
  }

  return result;
};
