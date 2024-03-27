import express from 'express';
import webpush from 'web-push';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

webpush.setVapidDetails(
  'https://cs472-roadwatch.vercel.app/', // TODO: Replace with final registered domain (e.g., https://roadwatch.com )
  process.env.NOTIFICATION_PUBLIC_KEY as string,
  process.env.NOTIFICATION_PRIVATE_KEY as string
);

// @ts-expect-error Don't need to worry about this until database implementation.
const tempDatabase = []; // TODO: Replace with database implemenation after linking with Sign Up screen.

router.post('/save-subscription', (req, res) => {
  tempDatabase.push(req.body); // TODO: Change to use actual database.
  res.json({ status: 200, message: 'Subscription saved!' });
});

router.get('/send-notification', async (req, res) => {
  const notificationResponse = await webpush.sendNotification(
    // @ts-expect-error Don't need to worry about this until database implementation.
    tempDatabase[0],
    req.query.message as string
  );

  res.json({ ...notificationResponse });
});

export default router;
