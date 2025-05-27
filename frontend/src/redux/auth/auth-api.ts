import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import envConfig from '@configs/env-config';

export const authApi = createApi({
  reducerPath: 'auth_api',
  baseQuery: fetchBaseQuery({ baseUrl: envConfig.BACKEND_BASE_URL }),
  endpoints: () => ({}),
})


export default authApi;