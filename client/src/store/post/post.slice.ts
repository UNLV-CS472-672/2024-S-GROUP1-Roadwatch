import { apiSlice } from '../api';
import { TPost } from '@/types';

interface SavePost {
  user: string;
  community: string;
  type: string;
  marker?: {
    longitude: number;
    latitude: number;
  };
  content: {
    title: string;
    body: string;
  };
}

const post = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get community posts query
    getCommunityPosts: builder.query<TPost[], string>({
      query: (communityId) => `/community/${communityId}/posts`,
      providesTags: ['Post'],
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
    savePost: builder.mutation<void, SavePost>({
      query: (body) => ({
        url: 'posts/',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Post'],
    }),

    // Delete post mutation
    /* Example API call, no body needed: (DELETE request)
      http://<host:port>/api/post/delete-post/6624433ebb544208ea1b097b
    */
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetCommunityPostsQuery, useSavePostMutation, useDeletePostMutation } = post;
