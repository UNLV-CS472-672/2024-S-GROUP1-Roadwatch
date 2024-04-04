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

export const saveSubscription = async (req: Request, res: Response) => {
  const { id, subscription } = req.body;

  if (!id) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    // Ensure the user isn't already subscribed.
    // const user = await User.findById(id);
    // if (user?.notificationSubscription) {
    //   throw new Error('User is already subscribed to notifications.');
    // }

    await User.findByIdAndUpdate(id, {
      notificationSubscription: subscription,
    });
    console.log('Successfully subscribed to notifications!', subscription);
  } catch (error) {
    console.error('Notification Subscription Error: ', error);
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};

// TODO: Create unsubscribe endpoint

// TODO: Create "send to all users" endpoint

// TODO: Change `sendNotification` to POST instead of GET

export const sendNotification = async (req: Request, res: Response) => {
  if (!req.query.id) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    const user = await User.findById(req.query.id);

    // Ensure the user is subscribed to at least one subscription service.
    if (!user?.notificationSubscription) {
      throw new Error(
        'The user must be subscribed to notifications before one can be sent to them.'
      );
    }

    const subscription: webpush.PushSubscription = JSON.parse(
      user.notificationSubscription
    );

    const response = await webpush.sendNotification(
      subscription,
      req.query.message as string
    );

    console.log('Notification sent!');
    res.sendStatus(response.statusCode);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
