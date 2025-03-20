import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const globalSearchApi = createApi({
  reducerPath: 'globalSearchApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    listGlobalSearchItems: builder.query({
      query: (data: { searchQuery:string }) => {
        return {
          url: `/project/search/?query=${data.searchQuery}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {useListGlobalSearchItemsQuery } = globalSearchApi;
