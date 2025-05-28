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
    deleteProject: builder.mutation<SuccessResponse<void>, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE'
      })
    })
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} = projectsApi;

export default projectsApi;
