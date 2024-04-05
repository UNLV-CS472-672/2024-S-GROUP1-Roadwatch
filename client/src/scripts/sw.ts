/// <reference lib="webworker" />
// The above 'triple-slash' directive loads in WebWorker type information.

declare let self: ServiceWorkerGlobalScope;

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { ISendNotificationRequestBody } from '@/types';

// Removes previously cached assets when a new version of the PWA is installed.
cleanupOutdatedCaches();

/**
 * Enable prechacing to make the PWA load faster and feel more native.
 * For more info on precaching, visit this site: {@link https://www.freecodecamp.org/news/a-detailed-guide-to-pre-caching/#:~:text=Pre%2Dcaching%20is%20a%20technique,to%20the%20end%2Duser%20faster.}
 */
precacheAndRoute(self.__WB_MANIFEST);

// Enables auto-updating when we push new content to the PWA.
void self.skipWaiting();
clientsClaim();

// Intercept push notifications sent by the server and display them on the client.
self.addEventListener('push', (event) => {
  const notification = event.data?.json() as ISendNotificationRequestBody;
  event.waitUntil(
    self.registration.showNotification(notification.title, { ...notification.options })
  );
});
