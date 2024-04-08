import { Request, Response } from 'express';
import webpush from 'web-push';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

webpush.setVapidDetails(
  process.env.LIVE_SITE as string,
  process.env.NOTIFICATION_PUBLIC_KEY as string,
  process.env.NOTIFICATION_PRIVATE_KEY as string
);

interface ISendNotificationRequestBody {
  id: string;
  title: string;
  options?: NotificationOptions;
}

interface ISaveSubscriptionRequestBody {
  id: string;
  subscription: PushSubscription;
}

export const saveSubscription = async (
  req: Request<object, object, ISaveSubscriptionRequestBody>,
  res: Response
) => {
  const { id, subscription } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      $addToSet: { notificationSubscriptions: subscription },
    });

    res.statusMessage = 'User successfully subscribed to notifications.';
    res.sendStatus(200);
  } catch (error) {
    console.error('Notification Subscription Error: ', error);
    res.statusMessage = error as string;
    return res.sendStatus(400);
  }
};

export const unsubscribe = async (
  req: Request<object, object, ISaveSubscriptionRequestBody>,
  res: Response
) => {
  const { id, subscription } = req.body;

  try {
    await User.findByIdAndUpdate(id, {
      $pull: { notificationSubscriptions: subscription },
    });

    res.statusMessage = 'User successfully unsubscribed from notifications.';
    res.sendStatus(200);
  } catch (error) {
    console.error('Notification Unsubscribe Error: ', error);
    res.statusMessage = error as string;
    res.sendStatus(400);
  }
};

export const sendNotification = async (
  req: Request<object, object, ISendNotificationRequestBody>,
  res: Response
) => {
  try {
    const { id, title, options } = req.body;

    const user = await User.findById(id);

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
      return webpush.sendNotification(
        subJSON,
        JSON.stringify({ title, options })
      );
    });

    await Promise.all(notifications);

    res.statusMessage = 'Notification sent successfully';
    res.sendStatus(200);
  } catch (error) {
    console.error('Send Notification Error: ', error);
    res.statusMessage = error as string;
    res.sendStatus(400);
  }
};
