import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendSupportEmail: builder.mutation({
      query: (data: { subject:string; body: string }) => {
        return {
          url: '/user/support/',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useSendSupportEmailMutation } = supportApi;
