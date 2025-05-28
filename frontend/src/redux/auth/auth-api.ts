import type { LoginFormInput } from '@/schemas/login-form-schema';
import { type SuccessResponse, type User } from '@/types/response.types';
import { type RegisterFormInput } from '@schemas/register-form-schema';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '@configs/env-config';
import authSlice from '@redux/auth/auth-slice';

export const authApi = createApi({
  reducerPath: 'auth_api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${envConfig.BACKEND_BASE_URL}/auth`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<SuccessResponse<void>, RegisterFormInput>({
      query: (formData) => ({
        url: '/register',
        method: 'POST',
        body: formData,
      }),
    }),
    verifyUserOtp: builder.mutation<SuccessResponse<User>, { otp: string }>({
      query: (formData) => ({
        url: '/verify-email',
        method: 'POST',
        body: formData,
        cache: 'no-store',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authSlice.actions.setUser(data?.data));
        } catch (error) {
          console.error('OTP verification failed:', error);
        }
      },
    }),
    loginUser: builder.mutation<SuccessResponse<User>, LoginFormInput>({
      query: (formData) => ({
        url: '/login',
        method: 'POST',
        body: formData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authSlice.actions.setUser(data?.data));
        } catch (error) {
          console.error('OTP verification failed:', error);
        }
      }
    })
  }),
});

export default authApi;

export const {
  useRegisterUserMutation,
  useVerifyUserOtpMutation,
  useLoginUserMutation
} = authApi;
