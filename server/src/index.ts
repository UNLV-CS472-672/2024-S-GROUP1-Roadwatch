import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from './config/database';
import userRoutes from './routes/User';
import pushNotificationRoutes from './routes/PushNotification';
import markerRoutes from './routes/Marker';
import communityRoutes from './routes/Community';
import postRoutes from './routes/Posts';
import { initEmail } from './service/emailService';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connect();
initEmail();

// Middleware
app.use(cors()); // cors is needed for security otherwise some things are just inaccessbile
app.use(bodyParser.json()); // this is needed to parse body of requests

// routes
app.use('/api/user', userRoutes);
app.use('/api/push-notification', pushNotificationRoutes);
app.use('/api/marker', markerRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/posts', postRoutes);

// server start
app.listen(port, () => {
  console.log(`App listening on Port: ${port}`);
});
