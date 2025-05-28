import { configureStore } from '@reduxjs/toolkit';

// Auth Feature
import authApi from '@redux/auth/auth-api';
import authSlice from '@redux/auth/auth-slice';

// Projects Feature
import projectsApi from '@redux/projects/projects-api';

// Podcasts Feature
import podcastsApi from '@redux/podcasts/podcasts-api';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [podcastsApi.reducerPath]: podcastsApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      authApi.middleware,
      projectsApi.middleware,
      podcastsApi.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch