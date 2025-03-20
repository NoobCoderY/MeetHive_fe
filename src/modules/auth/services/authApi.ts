import { baseQueryWithReauth } from '@/app/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/user/auth/login/',
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        // accept_terms: boolean;
      }) => ({
        url: '/user/auth/signup/',
        method: 'POST',
        body: data,
      }),
    }),
    forgetPasswordVerify: builder.mutation({
      query: (data: { email: string }) => ({
        url: '/user/auth/forgot-password/',
        method: 'POST',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data: { newPassword: string; token: string | undefined }) => ({
        url: `/user/auth/update-password/${data.token}/`,
        method: 'PUT',
        body: { password: data.newPassword },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data: { token: string | undefined }) => ({
        url: '/user/auth/verify/',
        method: 'POST',
        body: data,
      }),
    }),

    getOnboardingInfo: builder.query({
      query: (data: { userId: string | undefined }) =>
        `/user/onboarding/${data.userId}/`,
      keepUnusedDataFor: 0,
    }),
    saveOnboarding: builder.mutation({
      query: (data) => ({
        url: `/user/onboarding/${data.userId}/`,
        method: 'PUT',
        body: {
          profession: data.profession[0],
          interests: data.interests,
        },
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: '/project/',
        method: 'POST',
        body: data,
      }),
    }),
    editProfile: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append('first_name', data?.first_name);
        formData.append('last_name', data?.last_name);
        formData.append('email', data?.email);
        if (data?.profile_picture) {
          formData.append('profile_picture', data?.profile_picture);
        }

        return {
          url: `/user/auth/edit-profile/`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: `/user/auth/delete-profile/`,
        method: 'DELETE',
      }),
      
      
    })
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordVerifyMutation,
  useUpdatePasswordMutation,
  useVerifyEmailMutation,
  useGetOnboardingInfoQuery,
  useSaveOnboardingMutation,
  useCreateProjectMutation,
  useEditProfileMutation,
  useDeleteProfileMutation
} = authApi;
