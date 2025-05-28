import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@utils/base-query-with-reauth';
import type { SuccessResponse, PaginatedResponse, Project } from '@/types/response.types';
import type { CreateProjectInput } from '@schemas/project-schemas';

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
    getAllProjects: builder.query<SuccessResponse<PaginatedResponse<Project>>, void>({
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
