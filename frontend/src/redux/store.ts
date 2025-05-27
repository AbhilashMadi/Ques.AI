import { configureStore } from '@reduxjs/toolkit'

// Auth Feature
import authSlice from '@redux/auth/auth-slice';
import authApi from '@redux/auth/auth-api';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([authApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch