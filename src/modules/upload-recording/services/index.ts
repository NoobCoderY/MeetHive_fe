import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define an interface for the request data


export const uploadRecordingApi = createApi({
  reducerPath: 'uploadRecordingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSignedUrl: builder.mutation({
      query: (data) => {
        return {
          url: '/project/transcription/signed-url',
          method: 'POST',
          body: data,
        };
      },
    }),
    createUploadRecordingTranscription: builder.mutation({
      query: (data) => {
        return {
          url: '/project/transcription/upload',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

// Export the auto-generated hooks for the mutation
export const { useGetSignedUrlMutation,
  useCreateUploadRecordingTranscriptionMutation
 } = uploadRecordingApi;
