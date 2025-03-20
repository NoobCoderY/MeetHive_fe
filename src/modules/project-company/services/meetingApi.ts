import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const meetingApi = createApi({
  reducerPath: 'meetingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllMeeting: builder.query({
      query: () => `/meeting/`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetAllMeetingQuery } = meetingApi;
