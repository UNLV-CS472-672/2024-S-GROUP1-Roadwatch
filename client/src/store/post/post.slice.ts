import { apiSlice } from '../api';
import { IMarker, TPost } from '@/types';

interface PostResponse {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
  };
  likeCount: number;
  type: string;
  marker: object;
  content: {
    title: string;
    body: string;
  };
}

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

const transformPostResponse = (response: PostResponse[]) =>
  response.map((post) => ({
    id: post._id,
    user: {
      id: post.user._id,
      firstName: post.user.firstName,
      lastName: post.user.lastName,
      userName: post.user.userName,
    },
    likeCount: post.likeCount,
    type: post.type,
    marker: post.marker,
    content: {
      title: post.content.title,
      body: post.content.body,
    },
  }));

const post = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all posts query
    getCommunityPosts: builder.query<TPost[], string>({
      query: (communityId) => `/post/community/${communityId}`,
      transformResponse: transformPostResponse,
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
        url: 'post/save-post',
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
        url: `/delete-post/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetCommunityPostsQuery, useSavePostMutation, useDeletePostMutation } = post;
