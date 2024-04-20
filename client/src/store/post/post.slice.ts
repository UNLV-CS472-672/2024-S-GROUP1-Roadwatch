import { apiSlice } from '../api';
import { TPost } from '@/types';

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
        url: `/delete-post/${id}`,
        method: 'DELETE',
      })
    }),
  }),
});


export const {
  useGetAllPostsQuery,
  useSavePostMutation,
  useDeletePostMutation
} = post;
