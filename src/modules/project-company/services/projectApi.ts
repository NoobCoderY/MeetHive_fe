import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Project'] as const,
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data: { name: string; description: string }) => ({
        url: '/project/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    listAllProject: builder.query({
      query: ({ page = 1, pageSize = 6 ,search=' ' }) => ({
        url: '/project/',
        method: 'GET',
        params: { page, pageSize, search },
      }),
      keepUnusedDataFor: 0,
      providesTags: [{ type: 'Project', id: 'LIST' }],
    }),
    updateProject: builder.mutation({
      query: (data: { name: string; description: string }) => ({
        url: `/project/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useListAllProjectQuery,
  useUpdateProjectMutation
} = projectApi;
