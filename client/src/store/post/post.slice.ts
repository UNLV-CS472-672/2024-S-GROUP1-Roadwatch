import { apiSlice } from '../api';
import { TPost } from '@/types';

const post = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<{ data: TPost[] }, void>({
      query: () => '/all-posts',
    }),
  }),
});

export const { useGetAllPostsQuery } = post;