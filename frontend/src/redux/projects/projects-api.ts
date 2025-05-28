import type ServerKeys from '@/resources/server-keys';
import { type PaginatedResponse, type Project, type SuccessResponse } from '@/types/response.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { CreateProjectInput } from '@schemas/project-schemas';
import { baseQueryWithReauth } from '@utils/base-query-with-reauth';

const projectsApi = createApi({
  reducerPath: 'projects_api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PROJECTS'],
  endpoints: (builder) => ({
    createProject: builder.mutation<SuccessResponse<Project>, CreateProjectInput>({
      query: (payload) => ({
        url: '/projects',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PROJECTS'],
    }),
    getAllProjects: builder.query<SuccessResponse<PaginatedResponse<Project & { [ServerKeys.PODCASTS_COUNT]: number }>>, void>({
      query: () => ({
        url: '/projects',
      }),
      providesTags: ['PROJECTS'],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
} = projectsApi;

export default projectsApi;
