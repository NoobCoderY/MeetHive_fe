import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const summaryApi = createApi({
  reducerPath: 'summmaryApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Summary', 'Usage'] as const,
  endpoints: (builder) => ({
    createSummary: builder.mutation({
      query: (data: { transcription: string }) => {
        return {
          url: '/project/summary/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Summary', id: 'LIST' }, { type: 'Usage' }],
    }),
    listAllSummary: builder.query({
      query: ({ page = 1, pageSize = 6 ,search=' '}) => ({
        url: '/project/summary/',
        method: 'GET',
        params: { page, page_size: pageSize,search:search },
      }),
      keepUnusedDataFor: 0,
      providesTags: [{ type: 'Summary', id: 'LIST' }],
    }),
    summaryById: builder.query({
      query: (data: { summaryId: string }) => ({
        url: `/project/summary/${data.summaryId}/`,
        method: 'GET',
      }),
      providesTags: (result, error, { summaryId }) => [
        { type: 'Summary', id: summaryId },
      ],
      keepUnusedDataFor: 0,
    }),
    updateSummary: builder.mutation({
      query: (data: {
        title: string;
        summary: string;
        isEditable: boolean;
        summaryId: string;
      }) => ({
        url: `/project/summary/${data.summaryId}/`,
        method: 'PUT',
        body: {
          title: data.title,
          summary: data.summary,
          is_editable: data.isEditable,
        },
      }),
      invalidatesTags: (result, error, { summaryId }) => [
        { type: 'Summary', id: 'LIST' },
        { type: 'Summary', id: summaryId },
      ],
    }),
    deleteSummary: builder.mutation({
      query: (data: { summaryId: string }) => ({
        url: `/project/summary/${data.summaryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Summary', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateSummaryMutation,
  useListAllSummaryQuery,
  useUpdateSummaryMutation,
  useDeleteSummaryMutation,
  useSummaryByIdQuery,
} = summaryApi;
