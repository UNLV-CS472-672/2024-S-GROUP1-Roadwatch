/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../api';
import { ICommunity } from '@/types';

const transformCommunityResponse = (response: any[]) =>
  response.map((community: any) => ({
    id: community._id,
    name: community.name,
    address: {
      street: community.street,
      city: community.city,
      state: community.state,
      zip: community.zip,
    },
    longitude: community.longitude,
    latitude: community.latitude,
    radius: community.radius,
    users: community.users.map((u: any) => u.firstName as string),
    image: community.image,
    posts: community.posts,
  }));

const community = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommunities: builder.query<ICommunity[], void>({
      query: () => 'community/all-communities',
      transformResponse: transformCommunityResponse,
    }),
  }),
});

export const { useGetAllCommunitiesQuery } = community;
