import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '@/utils';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_API_BASE_URL,
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['User'],
});
