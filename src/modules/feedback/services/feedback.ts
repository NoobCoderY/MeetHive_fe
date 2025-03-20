import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (data: { reaction: boolean,feedback?:string }) => {
        return {
          url: '/user/feedback/',
          method: 'POST',
          body: data,
        };
      }
    }),
  }),
});

export const {
  useCreateFeedbackMutation,

} = feedbackApi;
