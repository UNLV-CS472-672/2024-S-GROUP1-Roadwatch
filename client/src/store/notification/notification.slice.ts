import { apiSlice } from '../api';

interface INotification {
  message: string;
}

interface INotficationResponse {
  status: number;
  message: string;
}

export const notification = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.query<INotficationResponse, INotification>({
      query: (notification) =>
        `/push-notification/send-notification?message=${notification.message}`,
    }),
    saveSubscription: builder.mutation({
      query: () => `/push-notification/save-subscription`,
    }),
  }),
});

export const { useLazySendNotificationQuery, useSaveSubscriptionMutation } = notification;
