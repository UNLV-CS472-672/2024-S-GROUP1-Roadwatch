/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiSlice } from '../api';
import { Auth, User } from '@/types';
import { setAccessToken } from '@/utils';

const transformUserResponse = ({
  data: {
    _id: id,
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    dob,
    city,
    address,
    state,
    zip,
  },
}: any): User => ({
  id,
  firstName,
  lastName,
  userName,
  email,
  phoneNumber,
  dob,
  city,
  address,
  state,
  zip,
});

export const user = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => `/user`,
      transformResponse: transformUserResponse,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<void, User>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body: body,
      }),
    }),
    login: builder.mutation<Auth, { userInput: string; password: string }>({
      query: ({ userInput, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: {
          userInput,
          password,
        },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const { access_token } = data;
          setAccessToken(access_token);
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useLoginMutation } = user;
