import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/types";
import { getAccessToken, setAccessToken } from "@/utils";

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

export const user = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => `/user`,
      transformResponse: transformUserResponse,
    }),
    createUser: builder.mutation<void, User>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body: body
      })
    }),
    login: builder.mutation<any, { userInput: string, password: string }>({
      query: ({ userInput, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: {
          userInput,
          password
        }
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = (await queryFulfilled).data;
          const { access_token } = data;
          setAccessToken(access_token);
        } catch (error) {
          console.log(error);
        }
      },
    })
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useLoginMutation } = user;