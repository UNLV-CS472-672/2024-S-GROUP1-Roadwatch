import { apiSlice } from '../api';
import { SendResult } from 'web-push';

interface INotification {
  message: string;
}

export const notification = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.query<SendResult, INotification>({
      query: (notification) =>
        `/push-notification/send-notification?message=${notification.message}`,
    }),
    saveSubscription: builder.mutation({
      query: () => `/push-notification/save-subscription`,
    }),
  }),
});

export const { useLazySendNotificationQuery, useSaveSubscriptionMutation } = notification;
