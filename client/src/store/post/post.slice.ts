import { apiSlice } from '../api';
import { TPost } from '@/types';

// Reference:
// createUser: builder.mutation<void, User>({
//   query: (body) => ({
//     url: '/user',
//     method: 'POST',
//     body: body,
//   }),
// }),

const post = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<{ data: TPost[] }, void>({
      query: () => '/all-posts',
    }),
    savePost: builder.mutation<void, TPost>({
      query: (body) => ({
        url: '/save-post',
        method: 'POST',
        body: body,
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: '/delete-post',
        method: 'DELETE',
        body: { id },
      }),
    }),
  }),
});

export const { useGetAllPostsQuery } = post;