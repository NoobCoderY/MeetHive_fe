import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllCompany: builder.query({
      query: () => `/company/`,
      keepUnusedDataFor: 0,
    }),
   
  }),
});

export const {
  useGetAllCompanyQuery,
} = companyApi;
