import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from 'body-parser';
import { connect } from './config/database';
import userRoutes from './routes/User'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connect();

// Middleware
app.use(cors());  // cors is needed for security otherwise some things are just inaccessbile
app.use(bodyParser.json()); // this is needed to parse body of requests

// routes
app.use('/api/user', userRoutes)

// server start
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});