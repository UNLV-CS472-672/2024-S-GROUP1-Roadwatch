import { Request, Response } from 'express';
import webpush from 'web-push';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

webpush.setVapidDetails(
  'https://cs472-roadwatch.vercel.app/', // TODO: Replace with final registered domain (e.g., https://roadwatch.com )
  process.env.NOTIFICATION_PUBLIC_KEY as string,
  process.env.NOTIFICATION_PRIVATE_KEY as string
);

interface ISendNotificationRequestBody {
  id: string;
  title: string;
  options?: NotificationOptions;
}

export const saveSubscription = async (req: Request, res: Response) => {
  const { id, subscription } = req.body;

  if (!id) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    await User.findByIdAndUpdate(id, {
      $addToSet: { notificationSubscriptions: subscription },
    });

    res.statusMessage = 'User successfully subscribed to notifications.';
    res.sendStatus(200);
  } catch (error) {
    console.error('Notification Subscription Error: ', error);
    return res.sendStatus(400);
  }
};

// TODO: Create `sendNotificationToCommunity` endpoint.

export const unsubscribe = async (
  req: Request<object, object, { id: string; subscription: PushSubscription }>,
  res: Response
) => {
  const { id, subscription } = req.body;

  if (!id) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    await User.findByIdAndUpdate(id, {
      $pull: { notificationSubscriptions: subscription },
    });

    res.statusMessage = 'User successfully unsubscribed from notifications.';
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const sendNotification = async (
  req: Request<object, object, ISendNotificationRequestBody>,
  res: Response
) => {
  if (!req.body.id) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    const user = await User.findById(req.body.id);

    // Type guard; removes `undefined` from `notificationSubscriptions` type.
    if (!user?.notificationSubscriptions) {
      throw new Error('The `notificationSubscriptions` array is undefined.');
    }

    // Ensure the user is subscribed to at least one subscription service.
    if (user.notificationSubscriptions.length === 0) {
      throw new Error(
        'The user must be subscribed to notifications before one can be sent to them.'
      );
    }

    // Send notifications to all subscribed devices concurrently.
    const notifications = user.notificationSubscriptions.map((subscription) => {
      const subJSON: webpush.PushSubscription = JSON.parse(subscription);
      return webpush.sendNotification(subJSON, JSON.stringify(req.body));
    });

    await Promise.all(notifications);

    res.statusMessage = 'Notification sent successfully';
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
