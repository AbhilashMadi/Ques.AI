import { type SuccessResponse, type User } from '@/types/response.types';
import authSlice from '@redux/auth/auth-slice';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { ForgotPasswordInput, LoginFormInput, RegisterFormInput, ResetPasswordInput } from '@schemas/auth-schemas';
import { baseQueryWithReauth } from '@utils/base-query-with-reauth';

export const authApi = createApi({
  reducerPath: 'auth_api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<SuccessResponse<void>, RegisterFormInput>({
      query: (formData) => ({
        url: '/auth/register',
        body: formData,
        method: 'POST',
      }),
    }),
    verifyUserOtp: builder.mutation<SuccessResponse<User>, { otp: string }>({
      query: (formData) => ({
        url: '/auth/verify-email',
        body: formData,
        cache: 'no-store',
        method: 'POST',
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
        url: '/auth/login',
        body: formData,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authSlice.actions.setUser(data?.data));
        } catch (error) {
          console.error('OTP verification failed:', error);
        }
      }
    }),
    resendVerficationOtp: builder.mutation<SuccessResponse<void>, void>({
      query: () => ({ url: '/auth/resend-verification', method: 'POST' })
    }),
    forgotPassword: builder.mutation<SuccessResponse<void>, ForgotPasswordInput>({
      query: (formData) => ({
        url: '/auth/forgot-password',
        body: formData,
        method: 'POST'
      }),
    }),
    resetPassword: builder.mutation<SuccessResponse<void>, ResetPasswordInput & { token: string }>({
      query: (formData) => ({
        url: `/auth/reset-password?token=${formData.token}`,
        body: formData,
        method: 'POST'
      })
    }),
    claimMe: builder.query<SuccessResponse<User>, void>({
      query: () => ({
        url: '/auth/me',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authSlice.actions.setUser(data?.data));
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          // Clear the user on failure
          dispatch(authSlice.actions.clearUser());
        }
      },
    }),
    logoutUser: builder.mutation<SuccessResponse<void>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authSlice.actions.clearUser());
        } catch (error) {
          console.error('Failed to logout user:', error);
        }
      },
    })
  }),
});


export const {
  useRegisterUserMutation,
  useVerifyUserOtpMutation,
  useLoginUserMutation,
  useResendVerficationOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useClaimMeQuery,
  useLogoutUserMutation,
} = authApi;
export default authApi;
