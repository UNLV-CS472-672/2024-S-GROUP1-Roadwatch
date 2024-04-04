import express from 'express';
import * as notificationController from '../controllers/NotificationController';

const router = express.Router();

router.post('/save-subscription', notificationController.saveSubscription);

router.get('/send-notification', notificationController.sendNotification);

export default router;
