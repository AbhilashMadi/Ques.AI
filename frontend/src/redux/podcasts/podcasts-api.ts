import type { AddTranscriptInput } from '@/schemas/add-transcript-schema';
import type { Podcast, PodcastsListResponseType, SuccessResponse } from '@/types/response.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@utils/base-query-with-reauth';

const podcastsApi = createApi({
  reducerPath: 'podcasts_api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PODCASTS', 'PODCAST'],
  endpoints: (builder) => ({
    fetchProjectPodcasts: builder.query<PodcastsListResponseType, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}/podcasts`,
      }),
      providesTags: ['PODCASTS']
    }),
    createPodcast: builder.mutation<SuccessResponse<Podcast>, AddTranscriptInput>({
      query: (payload) => ({
        url: '/podcast',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PODCASTS']
    }),
    deletePodcast: builder.mutation<SuccessResponse<void>, string>({
      query: (podcastId) => ({
        url: `/podcast/${podcastId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PODCASTS']
    }),
    getPodcast: builder.query<SuccessResponse<Podcast>, string>({
      query: (podcastId) => ({
        url: `/podcast/${podcastId}`,
      }),
      providesTags: ['PODCAST']
    }),
    updateTranscript: builder.mutation<SuccessResponse<void>, { podcastId: string, transcript: string }>({
      query: ({ transcript, podcastId }) => ({
        url: `/podcast/${podcastId}`,
        body: { transcript },
        method: 'PATCH'
      }),
      invalidatesTags: ['PODCAST']
    })
  }),
});

export const {
  useFetchProjectPodcastsQuery,
  useCreatePodcastMutation,
  useDeletePodcastMutation,
  useGetPodcastQuery,
  useUpdateTranscriptMutation,
} = podcastsApi;
export default podcastsApi;
