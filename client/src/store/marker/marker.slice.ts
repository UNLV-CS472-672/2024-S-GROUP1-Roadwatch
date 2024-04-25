/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiSlice } from '../api';
import { IMarker } from '@/types';

export const marker = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarkers: builder.query<IMarker[], void>({
      query: () => '/marker',
    }),
    saveMarker: builder.mutation<void, IMarker>({
      query: (body) => ({
        url: '/marker',
        method: 'POST',
        body: body,
      }),
    }),
    deleteMarker: builder.mutation<void, IMarker>({
      query: (body) => ({
        url: '/marker',
        method: 'DELETE',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetMarkersQuery,
  useSaveMarkerMutation,
  useDeleteMarkerMutation,
  useLazyGetMarkersQuery,
} = marker;
