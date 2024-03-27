import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { Buffer } from 'buffer';
import Logo from './icons/512.png';

// Removes previously cached assets when a new version of the PWA is installed.
cleanupOutdatedCaches();

/**
 * Enable prechacing to make the PWA load faster and feel more native.
 * For more info on precaching, visit this site: {@link https://www.freecodecamp.org/news/a-detailed-guide-to-pre-caching/#:~:text=Pre%2Dcaching%20is%20a%20technique,to%20the%20end%2Duser%20faster.}
 */
precacheAndRoute(self.__WB_MANIFEST);

// Enables auto-updating when we push new content to the PWA.
self.skipWaiting();
clientsClaim();

/**
 *
 * @param subscription Push Notification subscription object created by the `PushManager` API.
 * @returns The response from the server after requesting to store the user's subscription object.
 */
const saveSubscription = async (subscription) => {
  const response = await fetch('http://localhost:3000/api/push-notification/save-subscription', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(subscription),
  });

  return response.json();
};

// Runs as soon as the service worker is created and registered.
self.addEventListener('activate', async () => {
  if (Notification.permission !== 'granted') return;

  const subscription = await self.registration.pushManager
    .subscribe({
      userVisibleOnly: true, // Makes user see every notification sent.
      applicationServerKey: Buffer.from(
        'BOF8HhjS9CbQ4Qf7SvJ7wehXHUveQ1iNBSkZSYifNIWVVmgadYmye5vy7wmAkFYVpIHnTXhyc5N6myssnwRcono',
        'base64' // MUST be encoded in Base64.
      ),
    })
    .catch((error) => {
      console.error(error);
    });
  await saveSubscription(subscription);
});

// Intercept push notifications sent by the server and display them on the client.
self.addEventListener('push', (e) => {
  e.waitUntil(self.registration.showNotification('Roadwatch', { body: e.data.text(), icon: Logo }));
});
