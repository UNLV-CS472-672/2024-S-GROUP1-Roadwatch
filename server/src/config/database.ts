import mongoose from 'mongoose';

const conn = mongoose.connection;
conn.on('error', (err) => console.error('DB Connection Error', err));

const connect = () => {
  let url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

  if (process.env.NODE_ENV === 'development') {
    url = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    // url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
  }

  mongoose.connect(url);
  conn.once('open', () => console.info('Connected to DB'));
};

export { connect, conn };
