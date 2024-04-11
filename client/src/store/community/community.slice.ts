import { apiSlice } from '../api';

const community = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommunities: builder.query<void, void>({
      query: () => '/all-communities',
    }),
  }),
});

export const { useGetAllCommunitiesQuery } = community;
