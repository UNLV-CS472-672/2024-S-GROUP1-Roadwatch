import { apiSlice } from '../api';

interface INotficationResponse {
  status: number;
  message: string;
}

interface ISubscription {
  id: string;
  subscription: PushSubscription;
}

interface ISendNotificationRequestBody {
  id: string;
  title: string;
  options?: NotificationOptions;
}

const notification = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation<INotficationResponse, ISendNotificationRequestBody>({
      query: (notification: ISendNotificationRequestBody) => ({
        url: `/push-notification/send-notification`,
        method: 'POST',
        body: { ...notification },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
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
    unsubscribe: builder.mutation<void, ISubscription>({
      query: ({ id, subscription }) => ({
        url: '/push-notification/unsubscribe',
        method: 'PUT',
        body: { id, subscription: JSON.stringify(subscription) },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useSendNotificationMutation } = notification;

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

/**
 * Provides a method for subscribing the user to receive push notifications.
 * @returns A tuple containing the trigger for initiating the subscription mutation and an object containing response information.
 *
 * @see {@link https://redux-toolkit.js.org/rtk-query/usage/mutations}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/unsubscribe}
 */
export const useNotificationUnsubscribeMutation = () => {
  const [unsubscribe, mutationData] = notification.useUnsubscribeMutation();

  const notificationUnsubscribeMutation = async ({ id }: Pick<ISubscription, 'id'>) => {
    if (Notification.permission === 'denied') return;
    if (Notification.permission === 'default') {
      await Notification.requestPermission().catch((e) => console.error(e));
    }

    // If the service worker hasn't been registered yet, don't attempt subscription.
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;

    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        // Unsubscribe the user on both the server and the browser.
        await unsubscribe({ id, subscription });
        await subscription.unsubscribe();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [notificationUnsubscribeMutation, mutationData] as const;
};
