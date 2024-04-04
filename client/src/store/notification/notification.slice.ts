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

export const notification = apiSlice.injectEndpoints({
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

export const { useLazySendNotificationQuery, useSaveSubscriptionMutation } = notification;

export const useNotificationSubscriptionMutation = async ({ id }: Pick<ISubscription, 'id'>) => {
  const [subscribe] = useSaveSubscriptionMutation();

  // Check notification permissions before proceeding.
  if (Notification.permission === 'denied') return;
  if (Notification.permission === 'default') {
    await Notification.requestPermission().catch((e) => console.error(e));
  }

  // If the service worker hasn't been registered yet, don't attempt subscription.
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return;

  try {
    const applicationServerKey = Buffer.from(
      'BOF8HhjS9CbQ4Qf7SvJ7wehXHUveQ1iNBSkZSYifNIWVVmgadYmye5vy7wmAkFYVpIHnTXhyc5N6myssnwRcono',
      'base64'
    );
    const subscription: PushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true, // Makes user see every notification sent.
      applicationServerKey,
    });
    await subscribe({ id, subscription });
  } catch (error) {
    console.error(error);
  }
};
