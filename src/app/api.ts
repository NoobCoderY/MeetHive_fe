import {
  fetchBaseQuery,
  BaseQueryApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { logout, setUser } from '@/modules/auth/auth-slice';
import { BASE_URL } from './constats';
import { IAuthResponse } from '@/modules/auth/models';
import Cookies from 'js-cookie';
import { generateRandomString } from './utils';

// Function to get the current locale
const getCurrentLocale = () => {
  return localStorage.getItem('locale') || 'en';
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token?.accessToken;
    const csrfToken: string =Cookies.get('csrftoken') || generateRandomString(32);
    const locale = getCurrentLocale();
    const companyToken = (getState() as RootState).company.selectedCompany?.id;
    const projectToken = (getState() as RootState).project.selectedProject?.id;
    headers.set('Set-Cookie', `csrftoken=${csrfToken}`);
    headers.set('X-CSRFToken', csrfToken);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Accept-Language', locale);
    if (companyToken) {
      headers.set('x-tenant-id', companyToken);
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (projectToken) {
      headers.set('X-Project-ID', projectToken);
    }
    return headers;
  },
  credentials: 'include',
});

/**
 * A base query function that handles token refresh on 401 unauthorized errors.
 *
 * If a request returns a 401 status, this function attempts to refresh the access token using the refresh token.
 * If successful, it updates the tokens in the state and retries the original request. If unsuccessful, it logs the user out.
 *
 * @param {string | FetchArgs} args - The arguments for the fetch request, which can be a URL string or an object containing the request parameters.
 * @param {BaseQueryApi} api - The API object provided by RTK Query, containing utilities such as `dispatch` and `getState`.
 * @param {object} extraOptions - Additional options for the fetch request.
 * @returns {Promise<object>} The result of the fetch request, potentially with a refreshed token.
 */

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => { 
  if (typeof args !== 'string' && args.body instanceof FormData) {
    if (args.headers) {
      delete args.headers['Content-Type'];
    } else {
      args.headers = {};
    }
  } else if (typeof args !== 'string') {
    args.headers = {
      ...args.headers,
      'Content-Type': 'application/json',
    };
  }

  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('Unauthorized request! Refreshing token...');

    const refreshResult: any = await baseQuery(
      {
        url: '/user/auth/refresh/',
        method: 'POST',
        body: {
          token: (api.getState() as RootState).auth.token?.refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const accessToken = refreshResult.data.data;

      const user = (api.getState() as RootState).auth.user;
      const refreshToken = (api.getState() as RootState).auth.token
        ?.refreshToken;

      const updatedCredentials: IAuthResponse = {
        user: {
          id: user?.id || '',
          email: user?.email || '',
          username: user?.username || '',
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          group: user?.group || [],
          profile_picture: user?.profile_picture || null,
        },
        token: {
          accessToken: accessToken,
          refreshToken: refreshToken as string,
        },
      };

      api.dispatch(setUser(updatedCredentials));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
