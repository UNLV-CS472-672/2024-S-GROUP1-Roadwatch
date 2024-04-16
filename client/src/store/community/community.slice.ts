import { apiSlice } from '../api';
import { ICommunity } from '@/types';

const community = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommunities: builder.query<{ data: ICommunity[] }, void>({
      query: () => '/all-communities',
    }),
  }),
});

export const { useGetAllCommunitiesQuery } = community;
