import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { setTranscriptionRestriction } from '../slice/restrcitionSlice';

export const restrictionApiApi = createApi({
  reducerPath: 'restrictionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Usage'],
  endpoints: (builder) => ({
    getMonthlyUsage: builder.query({
      query: () => ({ url: `/company/usage/`, method: 'GET' }),
      keepUnusedDataFor: 0,
      providesTags: ['Usage'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setTranscriptionRestriction({
              transcriptionRestrictionTime: data?.data?.transcription_duration,
              month: data?.data?.month,
            })
          );
        } catch (error) {
          console.error('Failed to fetch and set data:', error);
        }
      },
    }),
  }),
});

export const { useGetMonthlyUsageQuery } = restrictionApiApi;
