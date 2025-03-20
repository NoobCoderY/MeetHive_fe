import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const transcriptionApi = createApi({
  reducerPath: 'transcriptionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transcription', 'Usage'] as const,
  endpoints: (builder) => ({
    createTranscription: builder.mutation({
      query: (data: {
        title: string;
        description: string;
        text: any;
        duration: string;
      }) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('text', JSON.stringify(data.text));
        formData.append('duration', data.duration);

        return {
          url: '/project/transcription/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [
        { type: 'Transcription', id: 'LIST' },
        { type: 'Usage' },
      ],
    }),
    listAllTranscription: builder.query({
      query: ({ page = 1, pageSize = 6,search=' ',filter=' ' }) => ({
        url: '/project/transcription/',
        method: 'GET',
        params: {page: page, page_size: pageSize,search:search,filter:filter},
      }),
      keepUnusedDataFor: 0,
      providesTags: [{ type: 'Transcription', id: 'LIST' }],
    }),
    updateTranscription: builder.mutation({
      query: (data: {
        name: string;
        description: string;
        transcriptionId: string;
        text: any;
      }) => ({
        url: `/project/transcription/${data.transcriptionId}/`,
        method: 'PUT',
        body: {
          title: data.name,
          description: data.description,
          text: data.text,
        },
      }),
      invalidatesTags: [{ type: 'Transcription', id: 'LIST' }],
    }),
    deleteTranscription: builder.mutation({
      query: (data: { transcriptionId: string }) => ({
        url: `/project/transcription/${data.transcriptionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Transcription', id: 'LIST' }],
    }),
    transcriptionById: builder.query({
      query: (data: { transcriptionId: string }) => ({
        url: `/project/transcription/${data.transcriptionId}/`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateTranscriptionMutation,
  useListAllTranscriptionQuery,
  useUpdateTranscriptionMutation,
  useDeleteTranscriptionMutation,
  useTranscriptionByIdQuery,
} = transcriptionApi;
