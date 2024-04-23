import { apiSlice } from '../api';
import { TPost } from '@/types';

const post = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Get all posts query
    getAllPosts: builder.query<{ data: TPost[] }, void>({
      query: () => '/all-posts',
    }),

    // Save post mutation
    /* Example body for API call: 
      {
        "community": "5f785994e8421c13d422f946",
        "user": "5f785994e8421c13d422f947",
        "type": "text",
        "content": {
          "title": "Safety Tips",
          "body": "Here are some tips to stay safe during the holiday season."
        }
      } 
    */
    savePost: builder.mutation<void, TPost>({
      query: (body) => ({
        url: '/save-post',
        method: 'POST',
        body: body,
      }),
    }),

    // Delete post mutation
    /* Example API call, no body needed: (DELETE request)
      http://<host:port>/api/post/delete-post/6624433ebb544208ea1b097b
    */
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete-post/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useSavePostMutation,
  useDeletePostMutation
} = post;
