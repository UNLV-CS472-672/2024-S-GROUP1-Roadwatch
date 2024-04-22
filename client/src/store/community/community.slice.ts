import { apiSlice } from '../api';
import { ICommunity } from '@/types';

interface CommunityResponse {
  _id: string;
  name: string;
  street: string;
  longitude: number;
  latitude: number;
  radius: number;
  users: [{ firstName: string }];
  image: string;
  posts: [];
}

const transformCommunityResponse = (response: CommunityResponse[]) =>
  response.map((community: CommunityResponse) => ({
    id: community._id,
    name: community.name,
    street: community.street,
    longitude: community.longitude,
    latitude: community.latitude,
    radius: community.radius,
    users: community.users.map((u) => u.firstName),
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
