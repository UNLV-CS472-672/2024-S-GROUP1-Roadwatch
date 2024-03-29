import express from 'express';
import webpush from 'web-push';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

webpush.setVapidDetails(
  'mailto:kingj32@unlv.nevada.edu', // TODO: Replace with final registered domain (e.g., https://roadwatch.com )
  process.env.NOTIFICATION_PUBLIC_KEY as string,
  process.env.NOTIFICATION_PRIVATE_KEY as string
);

// @ts-expect-error Don't need to worry about this until database implementation.
const tempDatabase = []; // TODO: Replace with database implemenation after linking with Sign Up screen.

router.post('/save-subscription', (req, res) => {
  tempDatabase.push(req.body); // TODO: Change to use actual database.
  // @ts-expect-error Don't need to worry about this until database implementation.
  console.log('Subscribed', tempDatabase[0]);
  res.json({ status: 200, message: 'Subscription saved!' });
});

router.get('/send-notification', (req, res) => {
  webpush
    .sendNotification(
      // @ts-expect-error Don't need to worry about this until database implementation.
      tempDatabase[0],
      req.query.message as string
    )
    .then((response) => {
      console.log('Notification sent');
      res.json({
        status: response.statusCode,
        message: 'Message sent successfully!',
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        status: 500,
        message: 'Message was not sent.',
      });
    });

  // res.json({ ...notificationResponse });
  // console.log('notification sent');
});

export default router;
