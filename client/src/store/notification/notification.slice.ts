import { apiSlice } from '../api';

interface INotification {
  id: string;
  message: string;
}

interface INotficationResponse {
  status: number;
  message: string;
}

interface ISubscription {
  id: string;
  subscription: PushSubscription;
}

const notification = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.query<INotficationResponse, INotification>({
      query: ({ id, message }) =>
        `/push-notification/send-notification?id=${id}&message=${message}`,
    }),
    saveSubscription: builder.mutation<INotficationResponse, ISubscription>({
      query: ({ id, subscription }) => ({
        url: '/push-notification/save-subscription',
        method: 'POST',
        body: {
          id,
          subscription: JSON.stringify(subscription),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLazySendNotificationQuery } = notification;

/**
 * Provides a method for subscribing the user to receive push notifications.
 * @returns A tuple containing the trigger for initiating the subscription mutation and an object containing response information.
 *
 * @see {@link https://redux-toolkit.js.org/rtk-query/usage/mutations}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe}
 */
export const useNotificationSubscriptionMutation = () => {
  const [subscribe, mutationData] = notification.useSaveSubscriptionMutation();

  const notificationSubscriptionMutation = async ({ id }: Pick<ISubscription, 'id'>) => {
    // Check notification permissions before proceeding.
    if (Notification.permission === 'denied') return;
    if (Notification.permission === 'default') {
      await Notification.requestPermission().catch((e) => console.error(e));
    }

    // If the service worker hasn't been registered yet, don't attempt subscription.
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;

    try {
      // MUST encode VAPID public key into Base64.
      const applicationServerKey = Buffer.from(
        import.meta.env.VITE_NOTIFICATION_PUBLIC_KEY as string,
        'base64'
      );
      const subscription: PushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, // Makes user see every notification sent.
        applicationServerKey, // MUST be applied for all Chromium browsers.
      });
      await subscribe({ id, subscription });
    } catch (error) {
      console.error(error);
    }
  };

  return [notificationSubscriptionMutation, mutationData] as const;
};
